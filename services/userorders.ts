import { AppSettings } from "../config/config";
import { ApiCall } from "../helpers/apicall";
import { toFixedFloor } from "../helpers/common";
import { User } from "../helpers/user";
import { Pairs } from "../models/market";
// import { User } from "../models/user";
import { dispatchUserOrdersUpdate } from "../redux/dispatch";

export interface SmallOrder {
    rate: number;
    quantity: number;
}

export enum OrderSideType {
    Buy,
    Sell
}
export enum OrderType {
    'Market',
    'Limit',
    'Stop-limit',
    'Coco-Limit',
    'Coco-Stop'
}

export enum OrderStatus {
    Active, Completed, Canceled, OnHold, __
}

export interface IOrdersSearch {
    marketCurrency?: number,
    baseCurrency?: number,
    side?: number,
    type?: number,
    date?: string
}

export interface IOrdersMySearch {
    marketCurrency?: number,
    baseCurrency?: number,
    side?: number,
    Type: 'trade_history' | 'order_history' | 'open_orders',
    Date?: string,
    CurrentPageIndex?: number
}

export interface IOrder {
    id: string,
    pairId: number,
    type: number,
    side: number,
    average: number,
    price: number,
    amount: number,
    filled: number,
    triggerCondition: string,
    status: number,
    date: string,
    fills: IFill[],
    isDtradeOrder: boolean,
    IsDtradeProOrder: boolean,
    pair?:any;
}
export interface IFill {
    date: string,
    tradingPrice: number,
    amount: number,
    fee: string
}

export class UserOrders {
    private activeOrders = [0, 3];
    private lastRefresh: number;
    public allOrders: IOrder[] = [];
    public onCompleteFill?: (order: IOrder) => void;
    private static instance: UserOrders;
    private constructor(private api: ApiCall = ApiCall.getInstance()) {
        if(UserOrders.instance) {
            throw new Error("Error: Instantiation failed: Use UserOrders.getInstance() instead of new.");
        }
        
        this.lastRefresh = Date.now();
    }
    public static getInstance(): UserOrders {
        if (UserOrders.instance == null)
            UserOrders.instance = new UserOrders();
        return UserOrders.instance;
    }
    public async start() {
        this.allOrders = await this.getOrders({});
        this.dispatchUpdate();
    }
    public orderUpdateHandler(ords: any) {
        // 
        ords = JSON.parse(ords);
        const orders: IOrder[] = ords.map(this.ordArToIOrderSocket);
        orders.forEach(ord => {
            this.updateOrder(ord);
        });
        this.dispatchUpdate();
    }
    public async cancelOrders(orderIds: string[]) {
        return (await this.api.postAuth('trade/cancel-order', {Ids: orderIds.join(',')})).Status as boolean;
    }
    public async getOrders(searchParams: IOrdersSearch): Promise<IOrder[]> {
        searchParams.marketCurrency = searchParams.marketCurrency ?? 0;
        searchParams.baseCurrency = searchParams.baseCurrency ?? 0;
        searchParams.side = searchParams.side ?? 3;
        searchParams.type = searchParams.type ?? 1;
        searchParams.date = searchParams.date ?? 'null';

        try
        {
            const _orders = ((await this.api.postAuth('trade/user-orders', searchParams, false)).Result as any[]) ?? [];
            const orders1: IOrder[] = _orders.map(this.ordArToIOrder);
            // 
            const orders: IOrder[] = orders1.filter((item: any) => this.filterDtradeOrder(item));
            return orders;
        } catch(er) {
            return [];
        }
    }
    public filterDtradeOrder = (order: any) => {
        // 
        return ((User.getInstance().isTopTrader() && User.getInstance().isDtradeOn() && (order.isDtradeOrder || order.IsDtradeProOrder)) || 
            (User.getInstance().isTopTrader() && !User.getInstance().isDtradeOn() && (!order.isDtradeOrder && !order.IsDtradeProOrder)) || 
            (!User.getInstance().isTopTrader()))
    }
    public async getMyOrders(searchParams: IOrdersMySearch): Promise<IOrder[]> { // to get my user my orders pages info
        searchParams.marketCurrency = searchParams.marketCurrency ?? 0;
        searchParams.baseCurrency = searchParams.baseCurrency ?? 0;
        searchParams.side = searchParams.side ?? 3;
        searchParams.Date = searchParams.Date ?? 'null';
        searchParams.CurrentPageIndex = searchParams.CurrentPageIndex ?? 1;
        try {
            const _orders = ((await this.api.postAuth('trade/all-orders-history', searchParams, false)).Result.Result as any[]) ?? [];
            const orders: IOrder[] = _orders.map(this.ordArToIOrder);
            return orders;
        } catch(er) {
            return [];
        }
    }
    public async requestRefresh(timeThreshold: number = 60000) {
       if((Date.now() - this.lastRefresh) > timeThreshold) { //10sec
            this.lastRefresh = Date.now();
            await this.updateOrders();
            this.lastRefresh = Date.now();
        }
    }
    public dispose() {
        this.allOrders = [];
    }
    private dispatchUpdate() {
        this.limitData();
        dispatchUserOrdersUpdate(this.allOrders);
    }
    public dispatchDtradeOrder(){
        this.dispatchUpdate()
    }
    private async updateOrders() {
        this.allOrders = await this.getOrders({});
        // const ords = await this.getOrders({});
        // this.dups('Line138');
        // ords.forEach(a => {
        //     this.updateOrder(a);
        // })
    }
    private limitData() {
        // this.allOrders.sort((a,b) => { return Number(a.date.replaceAll(/[-T:Z]/g, '')) - Number(b.id.replaceAll(/[-T:Z]/g, '')); })
        // sorting not needed since array is already sorted
        if(this.allOrders.length > 500) {
            for(let i = 500; i < this.allOrders.length; i++) {
                const ord = this.allOrders[i];
                if(this.activeOrders.indexOf(ord.status) < 0) {
                    this.allOrders.splice(i, 1);
                }
            }
        }
    }
    private updateOrder(ord: IOrder) {
        const ordIndex = this.allOrders.map(a => a.id).indexOf(ord.id);
        if(ordIndex >= 0) {
            if(this.onCompleteFill && this.allOrders[ordIndex].status != ord.status && ord.status == 1) {
                this.onCompleteFill(ord);
            }
            this.allOrders[ordIndex].status = ord.status;
            this.allOrders[ordIndex].amount = ord.amount;
            this.allOrders[ordIndex].filled = ord.filled;
            ord.fills.forEach(a => {
                if(this.allOrders[ordIndex].fills.filter(b => 
                        b.amount === a.amount && 
                        b.date === a.date && 
                        b.fee === a.fee && 
                        b.tradingPrice === a.tradingPrice
                    ).length == 0) {
                    this.allOrders[ordIndex].fills.unshift(a);
                }
            })
            // this.allOrders[ordIndex].fills.unshift(...ord.fills);
        } else {
            this.allOrders.unshift(ord);
            if(this.onCompleteFill && ord.status == 1) {
                this.onCompleteFill(ord);
            }
        }
    }
    private ordArToIOrder(order: any[]): IOrder {
        let triggerCond = '-';
        //order[9] === 3 && 
        if ((order[2] === 2 || order[2] === 4) && order[8] !== '-') {
            const pair = Pairs.getInstance().getPair(order[1]);
            if (Number(pair.rate) > Number(order[8])) {
                triggerCond = '<=' + toFixedFloor(order[8], pair?.basePrecision!);
            } else {
                triggerCond = '>=' + toFixedFloor(order[8], pair?.basePrecision!);
            }
        }
        return {
            id: order[0],
            pairId: order[1],
            type: order[2],
            side: order[3],
            average: order[4],
            price: order[5],
            amount: order[6],
            filled: order[7],
            triggerCondition: triggerCond,//order[8],
            status: order[9],
            date: order[10],
            fills: ((order[11] ?? []) as any[]).map((fill: any) => {
                return {
                    date: fill[0],
                    tradingPrice: fill[1],
                    amount: fill[2],
                    fee: fill[3]
                }  as IFill
            }),
            isDtradeOrder: order[12],
            IsDtradeProOrder: order[13]
        } as IOrder
    }
    // "IsDtradeProOrder": true,
    // "amount": "0.20000000",
    // "average": "0",
    // "date": "2022-01-31T07:41:10.0000000Z",
    // "filled": "0.00000000",
    // "fills": Array[],
    // "id": "2343859912",
    // "isDtradeOrder": false,
    //0, 1, 2, 3, 5, 7, 8, 9, 11, 12, 14, 17, 19, 20
    private ordArToIOrderSocket(order: any[]): IOrder {
        let triggerCond = '-';
        //order[7] == 3 && 
        if ((order[9] === 2 || order[9] === 4) && order[5] !== '-') {
            if (!order[18]) {
                triggerCond = '<=' + order[5];
            } else {
                triggerCond = '>=' + order[5];
            }
        }
        return {
            id: order[0],
            pairId: order[12],
            type: order[9],
            side: order[11],
            average: 0,
            price: order[1],
            amount: order[2],
            filled: order[2] - order[3],
            triggerCondition: triggerCond,
            status: order[7],
            date: order[8],
            fills: ((order[17] ?? []) as any[]).map((fill: any) => {
                return {
                    date: fill[0],
                    tradingPrice: fill[1],
                    amount: fill[2],
                    fee: fill[3]
                }  as IFill
            }),
            isDtradeOrder: order[19] > 0,
            IsDtradeProOrder: order[20] > 0
        } as IOrder
    }
    
}