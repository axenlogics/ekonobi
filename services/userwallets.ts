import { AppSettings } from "../config/config";
import { ApiCall } from "../helpers/apicall";
import { isNullOrUndefined, sleep } from "../helpers/common";
import { User } from "../helpers/user";
// import { Storage } from "../helpers/storage";
import { Currencies, Pairs } from "../models/market";
// import { User } from "../models/user";
import { dispatchUserWalletsUpdate } from "../redux/dispatch";

export interface IWallet {
    currencyId: number,
    address: string,
    balance: number,
    available: number,
    memo: string
    currency: any,
    btcBalance?: any,
    usdBalance?: any,
    minWithdraw?: any
    netwrorkConfirmation?: any,
    inorderBalance?: any;
    withdrawalFee: number
}

export interface IWalletInfo {
    wallets: IWallet[],
    btcTotal: number,
    usdTotal: number,
    limits: { [id: number]: IWithdrawLimit },
    limitsRead: IWithdrawLimitRead[]
}
interface IWithdrawLimit {
    limitation: number,
    consumed: number,
    currencyId: number,
    groupLimitId: number
}
interface IWithdrawLimitRead {
    currencyId: number,
    blockedForAmount: number
}

export class UserWallets {
    private lastRefresh: number;
    public wallet: IWalletInfo = {
        btcTotal: 0,
        usdTotal: 0,
        wallets: [],
        limitsRead: [],
        limits: {}
    } as IWalletInfo;
    private onWalletUpdateListeners: { [id: string]: (currencyIds: number[]) => void } = {};
    private static instance: UserWallets;
    private constructor(private api: ApiCall = ApiCall.getInstance()) {
        if (UserWallets.instance) {
            throw new Error("Error: Instantiation failed: Use UserWallets.getInstance() instead of new.");
        }
        this.lastRefresh = Date.now();
    }
    public static getInstance(): UserWallets {
        if (UserWallets.instance == null)
            UserWallets.instance = new UserWallets();
        return UserWallets.instance;
    }
    public async start() {
        this.wallet = await this.getWallets();
        this.dispatchUpdate();
    }
    public walletUpdateHandler(wlt: any) {
        wlt = JSON.parse(wlt);
        const wallets: IWallet[] = wlt.map(this.mapWalletOutputSocket);
        wallets.forEach(a => {
            const indx = this.wallet.wallets.map(b => b.currencyId).indexOf(a.currencyId);
            if (indx >= 0) {
                if (a.available !== undefined)
                    this.wallet.wallets[indx].available = a.available;
                if (a.balance !== undefined)
                    this.wallet.wallets[indx].balance = a.balance;
            } else {
                this.wallet.wallets.push(a);
            }
        });
        this.dispatchUpdate();
        const cids = wallets.map(a => a.currencyId);
        Object.values(this.onWalletUpdateListeners).forEach(a => {
            a(cids);
        })
    }
    public addWalletListener(id: string, callback: (currencyIds: number[]) => void) {
        this.onWalletUpdateListeners[id] = callback;
    }
    public removeWalletListener(id: string) {
        delete this.onWalletUpdateListeners[id];
    }
    public getWallet(currencyId: number) {
        return this.wallet.wallets.find(a => a.currencyId == currencyId);
    }
    public async getWallets(): Promise<IWalletInfo> {
        const hresp = (await this.api.postAuth(User.getInstance().isTopTrader() && User.getInstance().isDtradeOn()  ? 'trade/get-wallets-prodtrade' : 'trade/get-wallets', { PairId: 0, LimitStatus: 0 }));
        if (!hresp.Status) {
            await sleep(3000);
            return await this.getWallets();
        }
        // 
        const resp = hresp.Result;
        const limits: { [id: number]: IWithdrawLimit } = {};
        Object.keys(resp[3] ?? {}).forEach((k: any) => {
            limits[k] = {
                limitation: resp[3][k][0],
                consumed: resp[3][k][1],
                currencyId: resp[3][k][2],
                groupLimitId: resp[3][k][3]
            } as IWithdrawLimit;
        });
        const addedCids: any[] = [];
        return {
            btcTotal: resp[1],
            usdTotal: resp[2],
            limits: limits,
            wallets: resp[0].map(this.mapWalletOuput).filter((a: IWallet) => {
                return !isNullOrUndefined(a.currency) && (!(addedCids.indexOf(a.currencyId) > -1 || !addedCids.push(a.currencyId)));
            }).sort((a: any, b: any) => (a.currencyId - b.currencyId)),
            // (a.btcBalance == 0) - (b.btcBalance == 0)
            // || b.btcBalance - a.btcBalance
            // || a.currencyId - b.currencyId
            limitsRead: (resp[5] ?? []).map((a: number[]) => {
                return {
                    currencyId: a[0],
                    blockedForAmount: a[1]
                } as IWithdrawLimitRead
            })

        } as IWalletInfo;
    }
    public async requestRefresh(timeThreshold: number = 30000) {
        if ((Date.now() - this.lastRefresh) > timeThreshold) { //10sec
            this.lastRefresh = Date.now();
            await this.updateWallets();
            this.dispatchUpdate();
            this.lastRefresh = Date.now();
        }
    }
    private dispatchUpdate() {
        dispatchUserWalletsUpdate(this.wallet);
    }
    private async updateWallets() {
        this.wallet = await this.getWallets();
    }
    private async countBtcBalance(wlt: any) {
        let pairs = Pairs.getInstance();
        // pairs.init()
        // if(isNaN(wlt[2] * ((pairs.getUsdtPairRate(wlt[0]) / pairs.getUsdtPairRate(1))))){
        //    return wlt.btcBalance !== undefined ? wlt.btcBalance : 0;
        // } else {
        return wlt[2] * ((pairs.getUsdtPairRate(wlt[0]) / pairs.getUsdtPairRate(1)))
        // }
    }
    private mapWalletOuput(wlt: any): IWallet {
        let currencyIns = Currencies.getInstance();
        let pairs = Pairs.getInstance();
        const currency = currencyIns.getCurrency(wlt[0]);
        // 
        const minWithdraw =
            wlt[11] = wlt[11] === null ? [[wlt[0], 0, 0]] : wlt[11];
        currency?.chainInfo?.forEach((info: any) => {

            const setFee = wlt[11].find((item: any) => item[0] === info.chainId);
            // 
            if (setFee !== undefined) {
                info.minWithdraw = Number(setFee[1]);
                info.withdrawFee = Number(setFee[2]);
            }
        });
        return {
            currencyId: wlt[0],
            address: wlt[1],
            balance: wlt[2],
            available: wlt[3],
            memo: wlt[6],
            netwrorkConfirmation: wlt[7],
            currency: currency,
            inorderBalance: wlt[2] - wlt[3],
            btcBalance: isNaN(wlt[2] * ((pairs.getUsdtPairRate(wlt[0]) / pairs.getUsdtPairRate(1)))) ? 0 :
                wlt[2] * ((pairs.getUsdtPairRate(wlt[0]) / pairs.getUsdtPairRate(1))),
            usdBalance: wlt[2] * pairs.getUsdtPairRate(wlt[0]),
            minWithdraw: wlt[8],
            withdrawalFee: Number((wlt[10]) ?? (currency?.withdrawalFee ?? 0))


        } as IWallet;
    }
    private mapWalletOutputSocket(wlt: any): IWallet {
        return {
            currencyId: wlt[1],
            available: wlt[2],
            balance: wlt[3]
        } as IWallet;
    }
}