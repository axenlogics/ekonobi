import * as signalR from '@microsoft/signalr';
import * as signalRMsg from '@microsoft/signalr-protocol-msgpack';
import { AppSettings } from '../config/config';
import { ApiCall } from '../helpers/apicall';
import { sleep } from '../helpers/common';
import { PairI } from '../helpers/interfaces';
import { User } from '../helpers/user';
// import { Storage } from '../helpers/storage';
import { Pairs } from '../models/market';
// import { User } from '../models/user';
import { dispatchPairChange } from '../redux/dispatch';

export class Socket {
    private socketConnection: signalR.HubConnection;
    private activeSubscribtions: { [channel: string]: (data: any) => void };
    private _socketTicker?: SocketTicker;
    private _api: ApiCall = ApiCall.getInstance();
    private static instance: Socket;
    private _sendSubscrptions: { [channel: string]: any } = {};
    private _onReconnected: { [id: string]: (() => void) } = {};
    private _userSocket?: UserSocket;
    private newInstance = true;
    private istickerInit = false;
    private constructor() {
        if (Socket.instance) {
            throw new Error("Error: Instantiation failed: Use Socket.getInstance() instead of new.")
        }
        this.activeSubscribtions = {};
        if (!globalThis.document) {
            (globalThis.document as any) = undefined;
        }
        this.socketConnection = new signalR.HubConnectionBuilder().withHubProtocol(new signalRMsg.MessagePackHubProtocol())
            .withUrl(AppSettings.socketEndpoint + AppSettings.hubs.marketHub, {
                skipNegotiation: true,
                transport: signalR.HttpTransportType.WebSockets
            })
            .withAutomaticReconnect({
                nextRetryDelayInMilliseconds: (retryContext: any) => {
                    // console.warn("retrying", retryContext.elapsedMilliseconds)
                    if (retryContext.elapsedMilliseconds < 2000) {
                        return 1000;
                    } else if (retryContext.elapsedMilliseconds < 10000) {
                        return Math.random() * 2000;
                    } else if (retryContext.elapsedMilliseconds < 60000) {
                        // If we've been reconnecting for less than 60 seconds so far,
                        // wait between 0 and 10 seconds before the next reconnect attempt.
                        return Math.random() * 5000;
                    } else {
                        // If we've been reconnecting for more than 60 seconds so far, stop reconnecting.
                        return Math.random() * 10000;
                    }
                }
            })
            .configureLogging({
                log: (level: any, msg: any) => {
                    // if(level != 0 && msg.indexOf('No client') < 0)
                    // 
                }
            })
            .build();
        // this.socketConnection.onreconnecting(a => { console.warn('Reconnecting Occured', a); })
        this.socketConnection.onreconnected((a: any) => {
            // console.warn('Reconnection Occured');
            this.reSubscribeSendSubs();
        })
        // this.socketConnection.onclose(a => { console.warn("Connection Closed") })
        this.socketConnection.serverTimeoutInMilliseconds = 8000;
        this.socketConnection.keepAliveIntervalInMilliseconds = 4000;
    }
    private reSubscribeSendSubs() {
        Object.keys(this._sendSubscrptions).forEach(subs => {
            this.send(subs, this._sendSubscrptions[subs]);
        });
        if (User.getInstance().isLoggedIn())
            this.userAuth();
        this.runOnReconnection();
    }
    private runOnReconnection() {
        Object.values(this._onReconnected).forEach(cb => cb());
    }
    public onSocketReconnect(id: string, callback: () => void) {
        this._onReconnected[id] = callback;
    }
    public onSocketReconnectRemove(id: string) {
        delete this._onReconnected[id];
    }
    public isNewInstance() {
        return this.newInstance;
    }
    public static getInstance(): Socket {
        if (Socket.instance == null) {
            Socket.instance = new Socket();
        }
        else
            Socket.instance.newInstance = false;
        return this.instance;
    }
    public async start() {
        try {
            await this.socketConnection.start();
        } catch (ex) {
            await sleep(2000);
            await this.start();
        }
        this.reSubscribeSendSubs();
    }
    public async reconnect() {
        try {
            await this.socketConnection.stop();
        } catch (er) { }
        await this.start();
    }
    public async userAuth(): Promise<UserSocket> {
        const payload: any = await this._api.getAuth({});
        payload['pair'] = 'BTC/USDT';
        // 
        // this.socketConnection.send('UserAuth', JSON.stringify(payload));
        await this.send('UserAuth', JSON.stringify(payload));
        if (this._userSocket == null) {
            this._userSocket = new UserSocket(this);
        } else {
            this._userSocket.setSocket(this);
        }
        return this._userSocket;
    }
    public async dispose() {
        await this.socketConnection.stop();
    }
    public async send(channel: string, value: any) {
        await this.getReadyToSend();
        return await this.socketConnection.send(channel, value);
    }
    private async getReadyToSend() {
        let maxWait = 120; // 2mins
        while (this.socketConnection.state != signalR.HubConnectionState.Connected) {
            maxWait--;
            if (maxWait <= 0)
                break;
            await sleep(1000);
        }
    }
    public async sendSubscription(channel: string, value: any) {
        await this.getReadyToSend();
        this._sendSubscrptions[channel] = value;
        return await this.socketConnection.send(channel, value);
    }
    public async removeSendSubscription(channel: string) {
        delete this._sendSubscrptions[channel];
    }
    public on(channel: string, callback: (data: any) => void) {
        this.activeSubscribtions[channel] = callback;
        this.socketConnection.on(channel, callback);
    }
    public off(channel: string) {
        delete this.activeSubscribtions[channel];
        this.socketConnection.off(channel);
    }
    public async listenPair(pair: PairI, onOrderBookUpdates: (data: any) => void, onTradesUpdates: (data: any) => void): Promise<SocketPair> {
        const pairSocket = new SocketPair(pair, this, onOrderBookUpdates, onTradesUpdates);
        // await pairSocket.start();
        return pairSocket;
    }
    public startTickerUpdater(): SocketTicker {
        if (this._socketTicker == null)
            this._socketTicker = new SocketTicker(this);
        this.istickerInit = true;
        return this._socketTicker;
    }
    public getIsTickerInit() {
        return this.istickerInit;
    }
    public requestPairData(pairId: number) {
        this.send('GetPairData', pairId);
    }
}
export class SocketTicker {
    // private callbacks: { [id: string]: (() => void)} = {};
    private interval: any;
    constructor(private socket: Socket) {
        this.init();
    }
    private async init() {
        this.socket.on('TickerUpdates', ticks => {
            this.tickerUpdatesCallback(ticks);
        });
        await this.socket.requestPairData(1);
        this.updatePairChange();
    }
    private updatePairChange() {
        dispatchPairChange(Pairs.getInstance().pairs);
        setTimeout(() => { this.updatePairChange() }, 500);
    }
    // public subscribe(id: string, onTickUpdates: () => void) {
    //     if(this.callbacks[id])
    //         throw new Error("Already Listening");
    //     this.callbacks[id] = onTickUpdates;
    // }
    // public unSubscribe(id: string) {
    //     delete this.callbacks[id];
    // }
    public dispose() {
        this.socket.off('TickerUpdates');
        clearInterval(this.interval);
    }
    private tickerUpdatesCallback(ticks: any) {
        ticks = JSON.parse(ticks);
        const pairInstance = Pairs.getInstance();
        ticks.forEach((tick: any[]) => {
            const _pair = pairInstance.getPair(tick[0]);
            if (_pair == undefined) return;
            _pair.prevDayPrice = Number(tick[6]);
            _pair.trendUp = tick[8];
            _pair.rate = Number(tick[5]);
            _pair.high = Number(tick[3]);
            _pair.low = Number(tick[4]);
            _pair.bid = Number(tick[2]);
            _pair.ask = Number(tick[1]);
            _pair.volume = Number(tick[7]);
            _pair.trendUp24hr = _pair.rate > _pair.prevDayPrice;
            pairInstance.setPair(_pair);
        });
        ticks.forEach((tick: any[]) => {
            const _pair = pairInstance.getPair(tick[0]);
            if (_pair == undefined) return;
            if (_pair) {
                if (_pair?.baseCurrency?.id === 4) {
                    _pair.rateUsd = Number(_pair.rate);
                } else {
                    _pair.rateUsd = _pair?.rate! * pairInstance.getUsdtPairRate(_pair?.baseCurrency?.id!);
                }
            }
        });
    }
}
export class SocketPair {
    private _candle: any = AppSettings.chart.defaultCandle; //default candle
    private _onCandleUpdates?: (data: any) => void;
    public constructor(private _pair: PairI, private _socket: Socket,
        private onOrderBookUpdates: (data: any) => void,
        private onTradesUpdates: (data: any) => void) {
    }
    public async start() {
        this._socket.sendSubscription('JoinPairChannel', this._pair.id);
        this.initListeners();
    }
    private initListeners() {
        this._socket.on('OrderUpdates/' + this._pair.id, this.onOrderBookUpdates);
        this._socket.on('OrderHistoryUpdates/' + this._pair.id, this.onTradesUpdates);
    }
    public subscribeCandle(candle: number, onCandleUpdates: (data: any) => void) {
        this._socket.off('NewPriceBar/' + this._pair.id + '_' + this._candle);
        this._candle = candle;
        this._onCandleUpdates = onCandleUpdates;
        this._socket.on('NewPriceBar/' + this._pair.id + '_' + this._candle, this._onCandleUpdates);
    }
    public changeCandle(candle: number) {
        if (this._onCandleUpdates == null)
            throw new Error("callback is not setuped. Please call subscribecandle");
        this._socket.off('NewPriceBar/' + this._pair.id + '_' + this._candle);
        this._candle = candle;
        this._socket.on('NewPriceBar/' + this._pair.id + '_' + this._candle, this._onCandleUpdates);
    }
    public async dispose(switchingToDifferentPair: boolean = true) {
        this._socket.off('OrderUpdates/' + this._pair.id);
        this._socket.off('OrderHistoryUpdates/' + this._pair.id);
        this._socket.off('NewPriceBar/' + this._pair.id + '_' + this._candle);
        this._socket.removeSendSubscription('JoinPairChannel');
        if (!switchingToDifferentPair) {
            await this._socket.reconnect(); // reconnect needed so it can remove itself from pair subscrption
        }
    }
}

export class UserSocket {
    public constructor(private socket: Socket) {
    }
    public setSocket(socket: Socket) {
        this.socket = socket;
    }
    public async listenWalletUpdates(onWalletUpdates: (data: any) => void) {
        // 
        this.socket.on('WalletUpdate', onWalletUpdates);
    }
    public listenDTradeWalletUpdates(onDTradeWalletUpdates: (data: any) => void) {
        if (User.getInstance().isTopTrader()) {
            this.socket.on('DtradeWalletUpdate', onDTradeWalletUpdates);
        }
    }
    public listenUserOrderUpdates(onUserOrderUpdates: (data: any) => void) {
        this.socket.on('UserOrderUpdates', onUserOrderUpdates);
    }
    public dispose() {
        this.socket.off('WalletUpdate');
        this.socket.off('DtradeWalletUpdate');
        this.socket.off('UserOrderUpdates');
    }
}