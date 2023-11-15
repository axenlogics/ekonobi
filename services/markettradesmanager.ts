import { isEmptyString } from "../helpers/common";
import { PairI } from "../helpers/interfaces";
// import { PairI } from "../models/market";
import { disptachMarketHistory } from "../redux/dispatch";

interface IMarketTrade {
    rate: number,
    quantity: number,
    date: string,
    trendUp: boolean
}

export class MarketTradesManager {
    private _pair?: PairI;
    private trades: IMarketTrade[] = [];
    private broadCastUpdate = true;
    private interval?: any;
    constructor() {
    }
    public async changePair(pair: PairI) {
        this._pair = pair;
        this.trades = [];
        this.updater();
    }
    public onMarketUpdate(updates: string) {
        const updt = JSON.parse(updates) as any[];
        if(updt[1] === 1) {
            this.trades = updt[0].map((item: any) => {
                return {
                    rate: Number(item[0]),
                    quantity: Number(item[1]),
                    date: item[2],
                    trendUp: item[3]
                } as IMarketTrade;
            }).reverse()
        } else {
            const newTrades = updt.map((item: any) => {
                return {
                    rate: Number(item[0]),
                    quantity: Number(item[1]),
                    date: item[2],
                    trendUp: item[3]
                } as IMarketTrade;
            }).reverse();
            this.trades = [...newTrades, ...this.trades.splice(0, 60 - newTrades.length)];
        }
        this.broadCastUpdate = true;
    }
    public dispose() {
        this.trades = [];
        disptachMarketHistory(this.trades);
        if(this.interval > -1)
        clearInterval(this.interval);
    }
    public getPair() { 
        return this._pair;
    }
    private updater() {
        this._update();
    }
    private _update() {
        if(this.broadCastUpdate) {
            disptachMarketHistory(this.trades)
            this.broadCastUpdate = false;
        }
        setTimeout(() => { this._update() }, 500)
    }
}