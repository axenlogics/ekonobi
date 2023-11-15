import { toCeilFast, toFixedFloor, toFloor, toFloorFast } from "../helpers/common";
import { PairI } from "../helpers/interfaces";
// import { PairI } from "../models/market";
import { SmallOrder } from "./userorders";


export class OrderBookManager {
    private buyOrders: SmallOrder[] = [];
    private sellOrders: SmallOrder[] = [];
    public buyOrderBook: SmallOrder[] = [];
    public sellOrderBook: SmallOrder[] = [];
    public eventId: number = 0;
    private priceDecimals: number;
    private decimalPow: number = 0;
    private isDefaultDecimals: boolean = true;
    public constructor(private _pair: PairI, priceDecimals: number, private onOrderBookInvalidated: () => void, private onFirstInit: () => void = ()=>{}) {
        this.priceDecimals = priceDecimals;
        this.updateDecimalPow(priceDecimals);
    }
    public updatePriceDecimals(priceDecimals: number) {
        this.updateDecimalPow(priceDecimals);
        this.buyOrderBook = [];
        this.sellOrderBook = [];
        this.updateOrders(this.sellOrders.map(a => [a.quantity, a.rate]), this.sellOrderBook, false, true);
        this.updateOrders(this.buyOrders.map(a => [a.quantity, a.rate]), this.buyOrderBook, true, true);
    }
    public getPriceDecimals() {
        return this.priceDecimals;
    }
    public orderUpdateHandler(data: any) {
        data = JSON.parse(data);
        const eventId = data[2];
        if (data[3]) {
            this.refresh();
        } else if((eventId - this.eventId) != 1) {
            this.onOrderBookInvalidated();
        }
        this.updateOrders(data[0], this.sellOrders, false);
        this.updateOrders(data[1], this.buyOrders, true);
        this.updateOrders(data[0], this.sellOrderBook, false, true);
        this.updateOrders(data[1], this.buyOrderBook, true, true);
        if (this.eventId == 0) {
            this.onFirstInit();
        }
        this.eventId = eventId;
    }
    private updateOrders(data: any[], ordersArray: SmallOrder[], isBuy: boolean, grouped: boolean = false) {
        if(grouped && this.isDefaultDecimals) {
            ordersArray.length = 0;
            ordersArray.push(...(isBuy ? this.buyOrders : this.sellOrders));
            return;
        }
        const rounder = isBuy ? toFloorFast : toCeilFast;
        data.forEach((ord: number[]) => {
            ord[0] = Number(ord[0])
            ord[1] = grouped ? rounder(Number(ord[1]), this.decimalPow) : Number(ord[1])
            let handled = false;
            for(let i = 0; i < ordersArray.length; i++) {
                let _ord = ordersArray[i];
                if(_ord.rate == ord[1]) {
                    if(ord[0] <= 0)
                        ordersArray.splice(i, 1);
                    else
                        _ord.quantity = ord[0];
                    handled = true;
                    break;
                } else if (_ord.rate < ord[1]) {
                    if(ord[0] > 0)
                    {
                        ordersArray.splice(i, 0, {
                            rate: ord[1],
                            quantity: ord[0]
                        });
                    }
                    handled = true;
                    break;
                }
            }
            if (!handled && ord[0] > 0) {
                ordersArray.push({
                    rate: ord[1],
                    quantity: ord[0]
                });
            }
            else if (ordersArray.length == 0 && ord[0] > 0) {
                ordersArray.push({
                    rate: ord[1],
                    quantity: ord[0]
                });
            }
        });
    }
    private refresh() {
        this.buyOrders = [];
        this.sellOrders = [];
        this.buyOrderBook = [];
        this.sellOrderBook = [];
    }
    private updateDecimalPow(priceDecimals: number) {
        this.priceDecimals = priceDecimals;
        this.decimalPow = Math.pow(10, priceDecimals);
        this.isDefaultDecimals = priceDecimals == this._pair.basePrecision;
    }
    lastEventId: number = 0;
    public printOrderBookInConsole(rows: number = 15, interval: number = 5000) {
        return setInterval(() => {
            if(this.lastEventId != this.eventId)
            {
                this.lastEventId = this.eventId;
                console.clear();
                const count = this.sellOrderBook.length;
                // 
                this.sellOrderBook.forEach((a, index) => {
                    // if((count - index) <= rows)
                    // 
                });
                // 
                this.buyOrderBook.forEach((a, index) => {
                    // if(index < rows)
                    // 
                });
            }
        }, interval);
    }
}

export class OrderBookOld {
    public buyOrders: SmallOrder[];
    public sellOrders: SmallOrder[];
    public eventId: any = null;
    public totalOrderBookOrdersToShow = 9;
    public ratePrecision: number;
    public groupedSell: SmallOrder[] = [];
    public groupedBuy: SmallOrder[] = [];
    public totalOrderQuantity = { buy: 0, sell: 0 };
    public orderBookType = 0;

    private tempData: any = [];
    private orderBookReady = false;
    public constructor(private _pair: PairI, private onOrderBookInvalidated: () => void) {
        this.buyOrders = [];
        this.sellOrders = [];
        this.ratePrecision = this._pair.basePrecision ?? 0;
    }
    public orderUpdateHandler(data: any) {
        data = JSON.parse(data);
        if (data[3]) {
            this.refresh();
            // refresh orderbook
        } else {

        }
    }
    private refresh() {
        this.buyOrders = [];
        this.sellOrders = [];
    }
    public updateOrderBook(orderData: any) {
        if (orderData[2] !== 0) {
            if (this.eventId === null) {
                this.tempData.push(orderData);
                return;
            }
            if (this.eventId >= orderData[2]) {
                return;
            }
            if(!this.orderBookReady) return setTimeout(() => { this.updateOrderBook(orderData) }, 50);
            if ((orderData[2] - this.eventId) !== 1) {
                this.onOrderBookInvalidated();
                return;
            }
        }
        this.updateOrders(this.sellOrders, orderData[0]);
        this.updateOrders(this.buyOrders, orderData[1]);
        this.sortOrders(this.buyOrders, true);
        this.sortOrders(this.sellOrders, true);
        this.buyordersSorted();
        this.sellordersSorted();
        this.updatelengthofOrderbook();
        this.calculateTotal();
        this.eventId = orderData[2];
    }
    private updateOrders(orders: SmallOrder[], newOrders: any) {
        const pow = Math.pow(10, this._pair.marketPrecision ?? 0);
        newOrders.forEach((order: any) => {
            order[1] = Number(order[1]);
            order[0] = Number(order[0]);
            let index = -1;
            for (let i = 0; i < orders.length; i++) {
                if (orders[i].rate === order[1]) {
                    index = i;
                    break;
                }
            }
            if (index >= 0) {
                if ((Math.floor(order[0] * pow) / pow) <= 0) {
                    orders.splice(index, 1);
                } else {
                    orders[index].quantity = order[0];
                }
            } else if ((Math.floor(order[0] * pow) / pow) > 0) {
                const _order: SmallOrder = {
                    rate : order[1],
                    quantity : order[0]
                };
                // orders from socket babar
                if (_order.quantity !== 0) {
                    orders.push(_order);
                }
            }
        });
    }
    private sortOrders(orders: SmallOrder[], isBuy: boolean): void {
        if (orders.length > 0) {
            if (!isBuy) {
                orders = orders.sort((a, b): number => {
                    return a.rate - b.rate;
                });
            } else {
                orders = orders.sort((a, b): number => {
                    return b.rate - a.rate;
                });
            }
        }
    }
    private buyordersSorted() {
        const value = this.ratePrecision;
        if (value === this._pair.basePrecision) {
            this.groupedBuy = this.buyOrders;
            return;
        }
        const grpBuy = [];
        for (let i = 0; i <= this.buyOrders.length - 1; i++) {
            if (this.buyOrders[i]) {
                grpBuy.push({
                    rate: Number(this.decimal_trunc(this.buyOrders[i].rate, value)),
                    quantity: this.buyOrders[i].quantity,
                    total: (Number(this.decimal_trunc(this.buyOrders[i].rate, this._pair.basePrecision ?? 0)) * this.buyOrders[i].quantity)
                });
            }
        }

        for (let i = grpBuy.length - 1; i >= 0; i--) {
            if (grpBuy[i] && grpBuy[i - 1]) {
                if (grpBuy[i].rate === grpBuy[i - 1].rate) {
                    grpBuy[i].quantity = grpBuy[i - 1].quantity + grpBuy[i].quantity;
                    grpBuy[i].total = grpBuy[i - 1].total + grpBuy[i].total;
                    grpBuy.splice(i - 1, 1);
                }
            }
        }
        const groupedBuy = JSON.parse(JSON.stringify(grpBuy));
        this.groupedBuy = this.filterArray(groupedBuy, this.totalOrders(), false, false)
    }
    private sellordersSorted() {
        const value = this.ratePrecision;
        if (value === this._pair.basePrecision) {
            this.groupedSell = this.sellOrders;
            return;
        }
        // this.checkOrderExits();
        const grpSell = [];
        for (let i = 0; i <= this.sellOrders.length - 1; i++) {
            if (this.sellOrders[i]) {
                grpSell.push({
                    // rate: Number(this.decimal_trunc(this.sellOrders[i].rate, value)),
                    rate: Number(this.decimal_trunc(this.sellOrders[i].rate + (1 / (Math.pow(10, this.ratePrecision))), value)),
                    quantity: this.sellOrders[i].quantity,
                    total: (Number(this.decimal_trunc(this.sellOrders[i].rate, this._pair.basePrecision ?? 0)) * this.sellOrders[i].quantity)
                });
            }
        }
        for (let i = grpSell.length - 1; i >= 0; i--) {
            if (grpSell[i] && grpSell[i - 1]) {
                if (grpSell[i].rate === grpSell[i - 1].rate) {
                    grpSell[i].quantity = grpSell[i - 1].quantity + grpSell[i].quantity;
                    grpSell[i].total = grpSell[i - 1].total + grpSell[i].total;
                    grpSell.splice(i - 1, 1);
                }
            }
        }
        for (let i = grpSell.length - 1; i >= 0; i--) {
            if (grpSell[i].rate === 0) {
                if (grpSell.length === 1) {
                    // grpSell = [];
                    this.groupedSell = [];
                    return;
                }
                if (grpSell[i - 1] && grpSell[i]) {
                    grpSell[i - 1].quantity = grpSell[i - 1].quantity + grpSell[i].quantity;
                    grpSell.splice(i, 1);
                }
            }
        }
        const groupedSell = JSON.parse(JSON.stringify(grpSell));
        this.groupedSell = this.filterArray(groupedSell, this.totalOrders(), true, false);
        // this.groupedSell = grpSell;
    }
    public calculateTotal(type = 0) {
        const selllength = this.groupedSell.length;
        if (type !== 2) { // in case of 0 and 1
            this.totalOrderQuantity.buy = 0;
            this.groupedBuy.forEach((order, index) => {
                if (index < this.totalOrderBookOrdersToShow) {
                    this.totalOrderQuantity.buy += order.quantity;
                }
            });
        }
        if (type !== 1) { // in case of 0 and 2
            this.totalOrderQuantity.sell = 0;
            const t = selllength - this.totalOrderBookOrdersToShow;
            this.groupedSell.forEach((order, index) => {
                if (index >= t) {
                    this.totalOrderQuantity.sell += order.quantity;
                }
            });
        }
    }
    private updatelengthofOrderbook() {
        if (this.orderBookType === 1) {
            this.totalOrderBookOrdersToShow = ((18 > this.buyOrders.length) ?
                (18) : this.buyOrders.length);
        }
        if (this.orderBookType === 2) {
            this.totalOrderBookOrdersToShow = (18 > this.sellOrders.length) ?
                (18) : this.sellOrders.length;
        }
    }
    public applyTempUpdates() {
        this.tempData.sort((a: any, b: any) => {
            if (a[2] > b[2]) {
                return 1;
            } else if (a[2] < b[2]) {
                return -1;
            }
            return 0;
        });
        this.tempData.forEach((orderData: any) => {
            if (orderData[2] > this.eventId) {
                // 
                this.updateOrderBook(orderData);
            }
        });
        this.tempData = [];
    }
    private decimal_trunc(figure: number, decimals: number) {
        return toFixedFloor(figure, decimals);
    }
    private filterArray(items: any[], limit: any, reverse = false, reverseArray = false): any {
        let t;
        if (items.length <= limit) {
            t = items;
        } else {
            t = reverse ? items.slice(items.length - limit, items.length) : items.slice(0, limit);
        }
        return reverseArray ? t.slice().reverse() : t;
    }
    totalOrders() {
        return this.orderBookType == 0 ? 10 : this.totalOrderBookOrdersToShow;
        // isTablet && orderbook.orderBookType == 0) ? 10 : orderbook.totalOrderBookOrdersToShow
    }
}