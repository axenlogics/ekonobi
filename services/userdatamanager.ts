import { AppSettings } from "../config/config";
import { StorageClass } from "../helpers/storage";
import { User } from "../helpers/user";
// import { Storage } from "../helpers/storage";
// import { User } from "../models/user";
import { Socket, UserSocket } from "./socket";
import { UserOrders } from "./userorders";
import { UserWallets } from "./userwallets";

export class UserDataManager {
    private static instance: UserDataManager;
    private _userSocket?: UserSocket;
    private constructor(private socket: Socket = Socket.getInstance(),
        public userorders: UserOrders = UserOrders.getInstance(),
        public userWallets: UserWallets = UserWallets.getInstance()) {
        if(UserDataManager.instance) {
            throw new Error("Error: Instantiation failed: Use UserDataManager.getInstance() instead of new.");
        }
    }
    public static getInstance(): UserDataManager {
        if (UserDataManager.instance == null)
            UserDataManager.instance = new UserDataManager();
        return UserDataManager.instance;
    }
    public async start() {
        // 
        const strg = StorageClass.getInstance();
        const dtrade = (await strg.tryGet('istoptrader'));
        const isDtrade = dtrade.hasValue ? JSON.parse(dtrade.value) : false;
        User.getInstance().updateTopTraderValue(isDtrade);
        User.getInstance().loadisDtradeKey();
        this._userSocket = await this.socket.userAuth();
        const t = this.userWallets.start();
        await this.userorders.start();
        await t;
        this._userSocket?.listenUserOrderUpdates(ords => {
            this.userorders.orderUpdateHandler(ords);
        });

        this._userSocket?.listenWalletUpdates(wlt => {
            // 
            this.userWallets.walletUpdateHandler(wlt);
        });
        this._userSocket?.listenDTradeWalletUpdates(wlt => {
            // 
            this.userWallets.walletUpdateHandler(wlt);
        });
        this.socket.onSocketReconnect('udm', () => {
            this.userWallets.requestRefresh();
            this.userorders.requestRefresh();
        })
    }
    public async dispose() {
        this.userorders.dispose();
        this.socket.onSocketReconnectRemove('udm');
        await this.socket.reconnect();
    }
}