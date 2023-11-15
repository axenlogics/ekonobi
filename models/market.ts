import { AppSettings } from "../config/config";
import { ApiCall } from "../helpers/apicall";
import { sleep } from "../helpers/common";
import { ChaininfoI, CurrencyI, currencyTypeI, PairI, UserGroupLimit, UserLocketBalanceLimit, WalletI } from "../helpers/interfaces";
import { StorageClass } from "../helpers/storage";
import { User } from "../helpers/user";
import { setPair } from "../redux/actions/pair";
import { store } from "../redux/Store";
// import { Storage } from "../helpers/storage";
// import { User } from "./user";
// import { CommonJs } from "./commonjs";




export class BaseCurrencies {
  public static currencies = ['BTC', 'USDT', 'CROSS'];
}

export class PairsManager {
  private static instance: PairsManager;
  private MainPairId: any = 1;
  public static getInstance() {

    if (PairsManager.instance == null) {
      PairsManager.instance = new PairsManager();
    }
    return this.instance;
  }
  public initPairs() {
    Currencies.getInstance().init();
    Pairs.getInstance().init();
    const pairs = Pairs.getInstance().getPairs();

  }
  public getPairs(): PairI[] {
    return Object.values(this.pairs);
  }
  public getAllPairs(): { [id: number]: PairI } {
    return this.pairs;
  }
  public getPairById(Id: number): PairI {
    return PairsManager.getInstance().pairs[Id];
  }
  public changeMainPair(pair: PairI) {
    if (pair.id) {
      this.MainPairId = pair.id;
    }
  }
  public getMainPair() {
    return this.pairs[this.MainPairId];
  }
  public pairs: { [id: number]: PairI } = {
    0: {
      id: 0,
      name: '--/--',
      baseCurrency: { id: 2, name: '--', symbol: 'TRY', imgUrl: '/assets/images/newcoins/blank.svg', },
      marketCurrency: { id: 1, name: '--', symbol: 'BTC', imgUrl: '/assets/images/newcoins/blank.svg', },
      basePrecision: 1,
      marketPrecision: 7,
      rate: 0,
      volume: 0,
      volumeMarketCurrency: 0,
      low: 0,
      high: 1,
      change24hour: {
        value: 2.1,
        isPositive: false,
      },
      twitterSentiment: 158,
      isFav: true,
      trendUp: true,
      trendUp24hr: true,
      isMainPair: true,
      Status: 0,

    },
    1: {
      id: 1,
      name: 'BTC/TRY',
      baseCurrency: { id: 2, name: 'TRY', symbol: 'TRY', imgUrl: '/assets/images/newcoins/btc.svg', },
      marketCurrency: { id: 1, name: 'BTC', symbol: 'BTC', imgUrl: '/assets/images/newcoins/btc.svg', },
      basePrecision: 1,
      marketPrecision: 7,
      rate: 318000,
      volume: 50,
      volumeMarketCurrency: 742,
      low: 302585,
      high: 324581,
      change24hour: {
        value: 2.1,
        isPositive: false,
      },
      twitterSentiment: 158,
      isFav: true,
      trendUp: true,
      trendUp24hr: true,
      isMainPair: true,
      Status: 1,
    },
    2: {
      id: 2,
      name: 'BTC/USDT',
      baseCurrency: { id: 2, name: 'USDT', symbol: 'USDT', imgUrl: '/assets/images/newcoins/USDT.svg' },
      marketCurrency: { id: 1, name: 'BTC', symbol: 'BTC', imgUrl: '/assets/images/newcoins/btc.svg' },
      basePrecision: 2,
      marketPrecision: 6,
      rate: 18230,
      volume: 50,
      volumeMarketCurrency: 475,
      low: 17584,
      high: 19147,
      change24hour: {
        value: 2.1,
        isPositive: false,
      },
      twitterSentiment: 1467,
      isFav: false,
      trendUp: true,
      trendUp24hr: true,
      isMainPair: false,
      Status: 1,
    },
    3: {
      id: 3,
      name: 'ETH/TRY',
      baseCurrency: { id: 2, name: 'TRY', symbol: 'TRY' },
      marketCurrency: { id: 3, name: 'ETH', symbol: 'ETH', imgUrl: '/assets/images/newcoins/etc.svg' },
      basePrecision: 1,
      marketPrecision: 6,
      rate: 23000,
      volume: 50,
      volumeMarketCurrency: 300,
      low: 22589,
      high: 34258,
      change24hour: {
        value: 3.1,
        isPositive: true,
      },
      twitterSentiment: 479,
      isFav: true,
      trendUp: false,
      trendUp24hr: false,
      isMainPair: false,
      Status: 1,
    },
    4: {
      id: 4,
      name: 'LTC/USDT',
      baseCurrency: { id: 2, name: 'USDT', symbol: 'USDT' },
      marketCurrency: { id: 4, name: 'LTC', symbol: 'LTC', imgUrl: '/assets/images/newcoins/ltc.svg' },
      basePrecision: 1,
      marketPrecision: 4,
      rate: 1225,
      volume: 50,
      volumeMarketCurrency: 475,
      low: 1210,
      high: 1250,
      change24hour: {
        value: 9.1,
        isPositive: true,
      },
      twitterSentiment: 50,
      isFav: false,
      trendUp: true,
      trendUp24hr: false,
      isMainPair: false,
      Status: 1,
    },
    5: {
      id: 5,
      name: 'DOT/TRY',
      baseCurrency: { id: 2, name: 'TRY', symbol: 'TRY' },
      marketCurrency: { id: 5, name: 'DOT', symbol: 'DOT', imgUrl: '/assets/images/newcoins/dot.svg' },
      basePrecision: 1,
      marketPrecision: 2,
      rate: 1225,
      volume: 50,
      volumeMarketCurrency: 475,
      low: 1210,
      high: 1250,
      change24hour: {
        value: 9.1,
        isPositive: true,
      },
      twitterSentiment: 50,
      isFav: false,
      trendUp: true,
      trendUp24hr: false,
      isMainPair: false,
      Status: 1,
    },
    6: {
      id: 6,
      name: 'ADA/TRY',
      baseCurrency: { id: 2, name: 'TRY', symbol: 'TRY' },
      marketCurrency: { id: 6, name: 'ADA', symbol: 'ADA', imgUrl: '/assets/images/newcoins/ada.svg' },
      basePrecision: 1,
      marketPrecision: 2,
      rate: 1225,
      volume: 50,
      volumeMarketCurrency: 475,
      low: 1210,
      high: 1250,
      change24hour: {
        value: 9.1,
        isPositive: true,
      },
      twitterSentiment: 50,
      isFav: false,
      trendUp: true,
      trendUp24hr: false,
      isMainPair: false,
      Status: 1,
    },
  }

}


export class Currencies {
  private readonly key: string = 'currencies-data';
  public currencies: { [id: number]: CurrencyI } = {};
  private static instance: Currencies;
  private storage = StorageClass.getInstance();

  private constructor() {
    if (Currencies.instance) {
      throw new Error("Error: Instantiation failed: Use Currencies.getInstance() instead of new.");
    }
  }

  public static getInstance() {
    if (Currencies.instance == null) {
      Currencies.instance = new Currencies();
    }
    return this.instance;
  }

  public connectRedux(currencies: { [id: number]: CurrencyI }) {
    this.currencies = currencies;
  }

  public async init() {
    const currencies = await this.storage.tryGet(this.key);
    if (currencies.hasValue) {
      await this.initCurrency(currencies.value);
    } else {
      const response = demoData.currencies;
      // const response = await (await fetch(AppSettings.apiEndpoint + 'market/get-currencies')).json();
      let ncurrencies = JSON.stringify(response);
      this.storage.set(this.key, ncurrencies);
      await this.initCurrency(ncurrencies);
    }
  }

  private async initCurrency(currencies: any = null) {
    const currcdata = (currencies == null ? await this.storage.get(this.key) : currencies);
    const object = JSON.parse((currcdata)!);
    this.currencies = {};
    for (const key in object) {
      if (typeof object[key] !== 'undefined') {
        const cur: CurrencyI = {
          id: Number(object[key][0]),
          name: object[key][1],
          symbol: object[key][2],
          currencyType: object[key][3],
          precision: Number(object[key][4]),
          withdrawalFee: Number(object[key][5]),
          canWithdraw: (object[key][9]),
          status: Number(object[key][6]),
          imgUrl: AppSettings.cdnEndPoint + "assets/images/coins/" + object[key][1].split(' ').join('-').toLowerCase() + ".webp"
        };
        if (cur.currencyType === currencyTypeI.Leverage) {
          cur.symbol = cur.symbol!.split('X').join(' X ');
        }
        cur.chainInfo = [];
        cur.chainInfoB = object[key][10];
        // 
        if (cur.chainInfoB === undefined || cur.chainInfoB.length === 0) {
          // const backup: any = [[185, 18, '', 'CROSS', 2, '0.00000000', true, false, 0, '0.0000']];
          if (object[key][7] !== null && object[key][7] !== undefined) {
            cur.feePer = object[key][7][0][0];
          } else {
            cur.feePer = '0';
          }
          const backup: any = [[
            cur.id, // id   0
            cur.id,  // curid  1
            "0xdac17f958d2ee523a2206206994597c13d831ec7", // contract 2
            cur.symbol,   // chain name 3
            cur.id,     // 4
            Number(object[key][5]), // 5 
            false, // 6
            false, // 7
            0, // 8
            cur.feePer //(object[key][7] ? 0 : Number(object[key][7][0])),
          ]]
          cur.chainInfoB = backup;
        }
        if (cur.symbol === 'USDT') {
          cur.CustomFee = {};
          cur.CustomFee.OMNI = (object[key][7][0][0]);
          cur.CustomFee.ERC20 = (object[key][7][0][1]);
          cur.CustomFee.TRC20 = (object[key][7][0][2]);
        }
        else {
          if (object[key][7] !== null && object[key][7] !== undefined) {
            cur.feePer = object[key][7][0][0];
          }
        }
        cur.regex = (object[key][8]);
        if (!isNaN(Number(object[key][0]))) {
          this.currencies[Number(object[key][0])] = cur;
        }
      }
    }
    Object.keys(this.currencies).forEach((cur: any) => {
      if (this.currencies[cur].chainInfoB !== undefined) {
        this.currencies[cur]?.chainInfoB?.forEach((chain: any) => {
          const chainInfo: ChaininfoI = {};
          chainInfo.chainId = chain[4];
          chainInfo.chainName = chain[3];
          chainInfo.canDeposit = chain[7];
          chainInfo.canWithdraw = chain[6];
          chainInfo.withdrawFee = chain[5];
          chainInfo.minWithdraw = 1;
          // chain[9] = 10;
          chainInfo.depositAddressCurrency = chain[8] === 0 ? this.currencies[cur].id : chain[8];
          if (Number(chain[9]) !== 0) {
            chainInfo.feePer = chain[9];
          } else {
            chainInfo.feePer = undefined;
          }

          // chainInfo.isSelected = {};
          // chainInfo.isSelected = chainInfo.isSelected[chainInfo.chainName] == true;
          // this.currencies[cur].chainInfo.splice(this.currencies[cur].chainInfo.indexOf(chain), 1);
          this.currencies[cur].chainInfo?.push(chainInfo);

        });
      }
    });
    Object.keys(this.currencies).forEach((cur: any) => {
      if (this.currencies[cur].chainInfoB !== undefined) {
        delete this.currencies[cur].chainInfoB;
      }
    });
  }
  public getCurrency(id: number): CurrencyI {
    if (this.currencies != null) {
      return this.currencies[id];
    } else {
      this.initCurrency();
      return this.currencies[id];
    }
  }
  public getCurrencyByName(name: string) {
    name = name.toLowerCase();
    if (this.currencies != null) {
      for (const key in this.currencies) {
        if (typeof this.currencies[key] !== 'undefined') {
          if (this.currencies[key].name.toLocaleLowerCase() === name.toLowerCase()) {
            return this.currencies[key];
          }
        }
      }
    }
  }
  public getCurrencyBySymbol(name: string) {
    name = name.toLowerCase();
    if (this.currencies != null) {
      for (const key in this.currencies) {
        if (typeof this.currencies[key] !== 'undefined') {
          if (this.currencies[key].symbol.toLocaleLowerCase() === name.toLowerCase()) {
            return this.currencies[key];
          }
        }
      }
    }
  }
  public getCurrencies(): CurrencyI[] {
    const currencies: CurrencyI[] = [];

    // for (const key in this.currencies) {
    //   if (typeof this.currencies[key] !== 'undefined') {
    //     currencies.push(this.currencies[key]);
    //   }
    // }
    return Object.values(this.currencies);
  }

}

export class Pairs {
  private readonly key: string = 'pair-data';
  public pairs: { [id: number]: PairI } = {};
  private static instance: Pairs;
  private storage = StorageClass.getInstance();
  private _currencies: Currencies = Currencies.getInstance();
  public counter = 0;
  private constructor() {

    if (Pairs.instance) {
      throw new Error("Error: Instantiation failed: Use Pairs.getInstance() instead of new.");
    }
  }

  public static getInstance() {
    if (Pairs.instance == null) {
      Pairs.instance = new Pairs();
    }
    return this.instance;
  }

  public connectRedux(pairs: { [id: number]: PairI }) {
    if (!pairs[0]) {
      this.pairs = pairs;
    } else {
      (pairs as PairI[]).forEach(pair => {
        this.pairs[pair.id!] = pair;
      })
    }
  }

  public async init() {
    const pairs = await this.storage.tryGet(this.key);
    if (pairs.hasValue) {
      await this.initPair(pairs.value);
    } else {
      try {
        const response = demoData.pairs;
        // const response = await (await fetch(AppSettings.apiEndpoint + 'market/get-pairs')).json();
        let pairsd = JSON.stringify(response);
        this.storage.set(this.key, pairsd);
        await this.initPair(pairsd);
      } catch (error) {

      }

    }
  }
  public setPairs(pairs: PairI[]): void {
    for (const key in pairs) {
      if (pairs[key] !== undefined) {
        this.pairs[pairs[key].id ?? 0] = pairs[key];
      }
    }
  }
  public setPair(pair: PairI): void {
    this.pairs[pair.id!] = pair;
  }
  private async initPair(input: any = null) {
    const pcdata = (input == null ? await this.storage.get(this.key) : input);
    const resp = JSON.parse((pcdata)!);
    this.pairs = [];

    for (const key in resp) {
      if (typeof resp[key] !== 'undefined') {


        const pair: any = {};

        pair.name = resp[key][1];
        pair.type = resp[key][9];
        if (pair.type === 1) {
          pair.leveragePair = true;
          pair.leveragePercentage = pair.name!.split('x')[1];
          const substring = pair.name!.substring(pair.name!.indexOf('x') - 0, pair.name!.length);
          pair.leveragePairName = pair.name!.replace(substring, '');
          pair.leveragePairName = pair.leveragePairName + '/USDT';
        }
        pair.id = Number(resp[key][0]);
        pair.baseCurrency = this._currencies.getCurrency(Number(resp[key][2]));
        pair.marketCurrency = this._currencies.getCurrency(Number(resp[key][3]));
        pair.basePrecision = Number(resp[key][4]);
        pair.marketPrecision = Number(resp[key][5]);
        pair.precision = Number(resp[key][4]);
        pair.minimumTotal = Number(resp[key][6]);
        pair.minimumAmount = Number(resp[key][7]);
        pair.Status = Number(resp[key][8]);
        if (!isNaN(resp[key][0])) {
          this.pairs[resp[key][0]] = pair;
        }

      }

    }

  }
  public getPair(id: number): PairI {
    return this.pairs[id];
  }
  public getPairByName(name: string, ignoreSlashDash = false) {
    let _pair: any = {};
    for (const key in this.pairs) {
      if (this.pairs[key].type === 1) {
        if (this.pairs[key].name === name.replace('/', '-')) {
          _pair = this.pairs[key];
          break;
        }
      } else {
        if ((ignoreSlashDash && this.pairs[key].name!.split('-').join('/') === name) ||
          (!ignoreSlashDash && this.pairs[key].name === name)) {
          _pair = this.pairs[key];
          break;
        }
      }
    }
    return _pair;
  }

  public async getPairRates() {
    throw new Error("Deprecated: please use pairs from redux");
    const response = await (await fetch(AppSettings.apiEndpoint + 'market/get-ticker')).json();
    const data = response.Result;
    for (const key in data) {
      if (typeof data[key] !== 'undefined') {
        const _pair: any = this.getPair(data[key][0]);
        if (typeof _pair !== 'undefined') {
          let precision = 1000000000000;
          if (data[key][5] > 10) {
            precision = 100;
          }

          _pair.prevDayPrice = Math.round(data[key][6] * precision) / precision;
          const rate = Math.round(data[key][5] * precision) / precision;
          _pair.trendUp = data[key][8];
          _pair.rate = rate;
          _pair.high = Math.round(data[key][3] * precision) / precision;
          _pair.low = Math.round(data[key][4] * precision) / precision;
          _pair.bid = Math.round(data[key][2] * precision) / precision;
          _pair.ask = Math.round(data[key][1] * precision) / precision;
          _pair.volume = Math.round(data[key][7] * precision) / precision;
          _pair.trendUp24hr = _pair.rate > _pair.prevDayPrice;
          if (_pair) {
            if (_pair.baseCurrency.symbol === 'USDT') {
              _pair.rateUsd = _pair.rate;
            } else if (_pair.baseCurrency.symbol === 'BTC') {
              _pair.rateUsd = _pair.rate * this.getUsdtPairRate(_pair.baseCurrency.id);
              setTimeout(() => {
                _pair.rateUsd = _pair.rate * this.getUsdtPairRate(_pair.baseCurrency.id);
              }, 100);
            } else {
              _pair.rateUsd = _pair.rate * this.getUsdtPairRate(_pair.baseCurrency.id);
              setTimeout(() => {
                _pair.rateUsd = _pair.rate * this.getUsdtPairRate(_pair.baseCurrency.id);
              }, 100);
            }
          }
          this.setPair(_pair);

        }
      }
    }
  }

  public getPairs(): PairI[] {
    return Object.values(this.pairs);
  }
  public getUsdtPairRate(currencyId: number): number {
    for (const key in this.pairs) {
      if (!isNaN(Number(key)) && this.pairs[key] !== undefined) {
        try {
          if (this.pairs[key].marketCurrency?.id! === currencyId && this.pairs[key].rate !== undefined &&
            this.pairs[key].baseCurrency?.id === 4) {
            return this.pairs[key].rate ?? 0;
          }
        } catch (error) {
        }

      }
    }
    return 1;
  }
}

export class Wallets {

  public wallets: { [id: number]: WalletI } = {
    1: {
      id: 1,
      available: 0.1,
      balance: 0.1,
    },
    2: {
      id: 2,
      available: 100,
      balance: 100,
    },
    3: {
      id: 3,
      available: 1,
      balance: 1,
    },
    4: {
      id: 4,
      available: 10,
      balance: 10,
    },
    5: {
      id: 5,
      available: 12,
      balance: 12,
    },
    6: {
      id: 6,
      available: 12,
      balance: 12,
    }
  };
  private static instance: Wallets;
  public offlineCount = 0;
  public LimitStatus = 0;
  public LimitValue = 0;
  public withdrawAmount = 0;
  public isdtProTrades = false;
  public _pairs = Pairs.getInstance();
  public _currencies = Currencies.getInstance();
  public apiCall = ApiCall.getInstance();

  public walletStatus = [
    'Unverified', 'Pending', 'Processing', 'Completed', 'Rejected', 'Cancelled', 'Blocked', 'Expired',
    'Submitted', 'Approval', 'Approved', 'Declined', 'Cancelled'
  ];
  public TransactionStatus = [
    'Unconfirmed', 'Confirmed'
  ];
  public withdrawClass = [
    '#fc4c4c', '#fba91c', 'blue', '#00c896', '#fc4c4c', 'grey', '#fc4c4c', '#fba91c',
    'black', 'green', 'green', 'red', 'red  '
  ];
  public walletCls = [
    'danger', 'warning', 'info', 'success', 'danger', 'warning', 'danger', 'warning',
    'Submitted', 'Approval', 'Approved', 'Declined', 'Cancelled'
  ];

  private constructor() {

    if (Wallets.instance) {
      throw new Error("Error: Instantiation failed: Use Wallets.getInstance() instead of new.");
    }
  }
  public getWalletById(id: number) {
    return this.wallets[id];
  }
  public getWallets() {
    return this.wallets;
  }
  public static getInstance() {
    if (Wallets.instance == null) {
      Wallets.instance = new Wallets();
    }
    return this.instance;
  }
  // [id: number]: Wallet
  public connectRedux(wallets: { [id: number]: WalletI }) {
    this.wallets = wallets;
  }

  public convertToBtc(wallet: any) {
    const pairs: any = this._pairs.getPairs();
    if (wallet === undefined) {
      return;
    }
    let totalBtc;
    const baseCurrencies = BaseCurrencies.currencies;
    if (!(pairs.length > 0)) {
      return;
    }
    for (let i = 0; i < pairs.length; i++) {
      if (pairs[i].marketCurrency.symbol === wallet.currency.symbol && pairs[i].Status === 1) {
        if (pairs[i].baseCurrency.symbol === baseCurrencies[0]) {
          totalBtc = pairs[i].rate * wallet.balance;
          break;
        } else if (pairs[i].baseCurrency.symbol === baseCurrencies[1]) {
          totalBtc = (pairs[i].rate * wallet.balance) / this._pairs.getPairByName('BTC/USDT').rate;
        }
      }
    }
    if (totalBtc === undefined) {
      if (wallet.currency.symbol === 'USDT') {
        totalBtc = wallet.balance / this._pairs.getPairByName('BTC/USDT').rate;
      }
    }
    return totalBtc;
  }
  public updateBtcBalance(): void {
    const pairs: any = this._pairs.getPairs();
    let wallet: any;
    for (const id in this.wallets) {
      if (typeof this.wallets[id] !== 'undefined') {
        wallet = this.wallets[id];
        let totalBtc;
        const baseCurrencies = BaseCurrencies.currencies;
        if (!(pairs.length > 0)) {
          return;
        }
        for (let i = 0; i < pairs.length; i++) {
          if (pairs[i].marketCurrency.symbol === wallet.currency.symbol && pairs[i].Status === 1) {
            if (pairs[i].baseCurrency?.symbol === baseCurrencies[0]) {
              totalBtc = pairs[i].rate * wallet.balance;
              break;
            } else if (pairs[i].baseCurrency.symbol === baseCurrencies[1]) {
              totalBtc = (pairs[i].rate * wallet.balance) / this._pairs.getPairByName('BTC/USDT').rate;
            }
          }
        }
        if (totalBtc === undefined) {
          if (wallet.currency.symbol === 'USDT') {
            totalBtc = wallet.balance / this._pairs.getPairByName('BTC/USDT').rate;
          }
        }
        if (totalBtc === undefined) {
          totalBtc = 0;
        }
        this.wallets[id].btcBalance = totalBtc;
      }
    }
  }
  public totalBtcBalance() {
    const pairs: PairI[] | any = this._pairs.getPairs();
    let wallet: WalletI | any;
    let sumtotalBtc = 0;
    for (const id in this.wallets) {
      if (typeof this.wallets[id] !== 'undefined') {
        wallet = this.wallets[id];
        let totalBtc: any;
        const baseCurrencies = BaseCurrencies.currencies;
        if (!(pairs.length > 0)) {
          return;
        }
        for (let i = 0; i < pairs.length; i++) {
          if (pairs[i].marketCurrency.symbol === wallet.currency.symbol && pairs[i].Status === 1) {
            if (pairs[i].baseCurrency.symbol === baseCurrencies[0]) {
              totalBtc = pairs[i].rate * wallet.balance;
              break;
            } else if (pairs[i].baseCurrency.symbol === baseCurrencies[1]) {
              totalBtc = (pairs[i].rate * wallet.balance) / this._pairs.getPairByName('BTC/USDT').rate;
            }
          }
        }
        if (totalBtc === undefined) {
          if (wallet.currency.symbol === 'USDT') {
            totalBtc = wallet.balance / this._pairs.getPairByName('BTC/USDT').rate;
          }
        }
        sumtotalBtc = sumtotalBtc + (totalBtc);
      }
    }
    return sumtotalBtc;
  }
  public async init(pair: any, count = 0) {

    const body = { PairId: pair.id, LimitStatus: this.LimitStatus };
    let endPoint = User.getInstance().isTopTrader() && User.getInstance().isDtradeOn() ? 'trade/get-wallets-prodtrade' : 'trade/get-wallets';
    // 
    try {
      const success = await this.apiCall.postAuth(endPoint, body);
      this.offlineCount = 0;
      if (success.Status) {
        const array = success.Result[0];
        const withdrawLimits: UserGroupLimit[] = [];
        if (success.Result[3] !== undefined && success.Result[3] !== null) {
          for (const id in success.Result[3]) {
            if (typeof success.Result[3][id] !== 'undefined') {
              const userGroupLimit: UserGroupLimit = {};
              userGroupLimit.limitation = success.Result[3][id][0];
              userGroupLimit.consumed = success.Result[3][id][1];
              userGroupLimit.currency = this._currencies.getCurrency(success.Result[3][id][2]);
              withdrawLimits.push(userGroupLimit);
            }
          }
          this.LimitValue = success.Result[3];
        }
        if (success.Result[4] !== undefined && success.Result[4] !== null) {
          this.withdrawAmount = success.Result[4];
        }
        for (const key in array) {
          if (typeof array[key] !== 'undefined') {
            const cur = array[key];
            const wallet: WalletI = {};
            wallet.isMemo = cur[9];
            wallet.memo = cur[6];
            wallet.address = cur[1];
            wallet.available = Number(cur[3]);
            wallet.balance = Number(cur[2]);
            wallet.inOrderBalance = wallet.balance - wallet.available;
            wallet.pending = cur[4];
            wallet.conf = cur[7];
            wallet.minW = cur[8];
            wallet.id = cur[0];
            // 
            if (this._currencies.getCurrency(cur[0]) !== undefined) {
              // wallet.currency = Currencies.getCurrency(cur[0]);
              cur[11] = cur[11] === null ? [[wallet?.currency?.id, 0, 0]] : cur[11];
              wallet?.currency?.chainInfo?.forEach(info => {

                const setFee = cur[11].find((item: any) => item[0] === info.chainId);
                // 
                if (setFee !== undefined) {
                  info.minWithdraw = Number(setFee[1]);
                  info.withdrawFee = Number(setFee[2]);
                }
              });
              wallet.defaultTradePair = this.defaultTradePair(wallet?.currency!);
              if (wallet?.currency?.currencyType === currencyTypeI.Leverage) {
                wallet.currency.leverageSymbol = wallet.defaultTradePair!.split('X').join(' X ');
              }
            }

            if (wallet.currency !== undefined && wallet.currency.status === 1) {
              this.wallets[cur[0]] = wallet;
            }
          }
        }
        const userLocketBalanceLimit: UserLocketBalanceLimit[] = [];
        for (const id in success.Result[5]) {
          if (typeof success.Result[5][id] !== 'undefined') {
            const _userLocketBalanceLimit: UserLocketBalanceLimit = {};
            _userLocketBalanceLimit.currency = this._currencies.getCurrency(success.Result[5][id][0]);
            _userLocketBalanceLimit.limit = success.Result[5][id][1];
            userLocketBalanceLimit.push(_userLocketBalanceLimit);
          }
        }
        this.updateBtcBalance();
        return { wallets: this.wallets, success: success, withdrawLimits: withdrawLimits, userLocketBalanceLimit: userLocketBalanceLimit }
        // callBack(this.wallets, success.Result[1], success.Result[2], withdrawLimits, userLocketBalanceLimit);
      }
      // else if (count <= 2) {
      //   setTimeout(() => {
      //     this.init(pair, ++count);
      //   }, 500);
      // }
      else {
        return false;
      }
    } catch (err) {
      this.offlineCount += 1;
      let inter = 500;
      if (this.offlineCount > 2) {
        inter = 5000;
      }
      setTimeout(() => {
        this.init(pair);
      }, inter);

      throw new Error("Wallet fetch error");
    }

    this.LimitStatus = 0;
  }

  public defaultTradePair(currency: CurrencyI) {
    const pairs: any = this._pairs.getPairs();
    let leveragePair = false;
    if (currency === undefined) {
      return;
    }
    let defaultTrade;
    const baseCurrencies = BaseCurrencies.currencies;
    if (!(pairs.length > 0)) {
      return;
    }

    for (let ind = 0; ind < pairs.length; ind++) {
      if (pairs[ind].marketCurrency !== undefined) {
        if (pairs[ind].marketCurrency.symbol === currency.symbol && pairs[ind].Status === 1 && currency.status) {
          if (pairs[ind].baseCurrency.symbol === baseCurrencies[0]) {
            defaultTrade = baseCurrencies[0];
            break;
          } else if (pairs[ind].baseCurrency.symbol === baseCurrencies[1]) {
            if (pairs[ind].leveragePair) {
              leveragePair = true;
              defaultTrade = pairs[ind].name;
            } else {
              defaultTrade = baseCurrencies[1];
            }
          }
        }
      }
    }
    if (leveragePair) {
      return defaultTrade;
    }
    const pairName = currency.symbol + '/' + defaultTrade;
    if (defaultTrade !== undefined) {
      if (this._pairs.getPairByName(pairName) !== undefined) {
        if (this._pairs.getPairByName(pairName).high === 0) {
          return undefined;
        }
      }
    } else if (defaultTrade === undefined && currency.symbol === 'USDT') {
      return 'BTC-USDT';
    } else if (defaultTrade === undefined) {
      return undefined;
    }

    return currency.symbol + '-' + defaultTrade;

  }
  txUrl(url: string): { url: string, txId: string } {
    const splitedUrl = url.split(',');
    return { url: splitedUrl[1].replace('$TXID', splitedUrl[0]), txId: splitedUrl[0] };
  }
  public async getHistory(CurrentPageIndex: number, type: number) {

    const body = { Type: type, CurrentPageIndex: CurrentPageIndex };
    const endPoint = 'trade/transaction-history';
    const success = await this.apiCall.postAuth(endPoint, body)
    const wt: any = [];
    // 
    success.Result.Result.forEach((val: any) => {
      let classIndex = 0
      if (isNaN(val.Status)) {
        classIndex = this.walletCls.indexOf(val.Status);
      }
      val.Currency = this._currencies.getCurrency(val.CurrencyId);
      val.cls = this.walletCls[val.Status];
      if (type === 2) {
        // val.Status = this.TransactionStatus[val.Status];
      }
      if (type === 1) {
        val.Color = this.withdrawClass[classIndex];
        // val.Status = this.walletStatus[val.Status];
      }
      if (type === 0 && val.Type === 0) {
        val.Color = this.withdrawClass[classIndex];
        // val.Status = this.walletStatus[val.Status];
      }
      if (type === 0 && val.Type === 2) {
        val.Color = this.withdrawClass[classIndex];
        // val.Status = this.walletStatus[val.Status];
      }
      if (type === 0 && val.Type === 1) {
        // val.Status = this.TransactionStatus[val.Status];
      }
      if (val.Txid.split(',').length > 1) {
        // const common = CommonJs.getInstance();
        val.url = this.txUrl(val.Txid).url;
        val.Txid = this.txUrl(val.Txid).txId;
        // val.url = CommonJs.txUrl(val.Txid).url;
        // val.txId = CommonJs.txUrl(val.Txid).txId;
      } else {
        val.url = '';
        val.Txid = val.Txid;
      }
      wt.push(val);
    });
    // 
    // callBack(wt, success.Result.CurrentPageIndex, success.Result.PageCount);
    return { wt: wt, success: success }
  }
}
export class demoData {
  public static currencies = [
    [
      1,
      "Bitcoin",
      "BTC",
      0,
      6,
      "0.00050000",
      1,
      null,
      "^[13b]{1}[0-9a-zA-Z]{30,64}$",
      true,
      [
        [
          184,
          8,
          "",
          "BTC",
          1,
          "0.00050000",
          true,
          true,
          0,
          "0.0000"
        ]
      ]
    ],
    [
      2,
      "TRY",
      "TRY",
      0,
      0,
      "10.00000000",
      1,
      null,
      "^[D]{1}[0-9a-zA-Z]{33,34}$",
      true,
      [
        [
          264,
          18,
          "",
          "CROSSX",
          2,
          "1.00000000",
          false,
          false,
          2,
          "0.0000"
        ],
        [
          220,
          18,
          "0xdB9E0580B5370A05217aa99a6Fab4088eAb5074D",
          "BEP20",
          17,
          "25.00000000",
          true,
          true,
          3,
          "0.0000"
        ]
      ]
    ],
    [
      3,
      "Ethereum",
      "ETH",
      0,
      6,
      "0.00650000",
      1,
      null,
      "^[0x]{2}[0-9a-fA-F]{40}$",
      true,
      [
        [
          187,
          18,
          "",
          "ETH",
          3,
          "0.00650000",
          true,
          true,
          0,
          "0.0000"
        ]
      ]
    ],
    [
      4,
      "Tether",
      "USDT",
      0,
      2,
      "22.00000000",
      1,
      [
        [
          "30",
          "50",
          "4"
        ]
      ],
      "^^[13]{1}[0-9a-zA-Z]{30,38}$",
      true,
      [
        [
          94,
          6,
          "0xdac17f958d2ee523a2206206994597c13d831ec7",
          "ERC20",
          3,
          "40.00000000",
          true,
          true,
          3,
          "0.0000"
        ],
        [
          181,
          6,
          "TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t",
          "TRC20",
          8,
          "4.00000000",
          true,
          true,
          10,
          "0.0000"
        ],
        [
          180,
          18,
          "0x55d398326f99059ff775485246999027b3197955",
          "BEP20",
          17,
          "4.00000000",
          true,
          true,
          3,
          "0.0000"
        ],
        [
          277,
          6,
          "Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB",
          "SOL",
          20,
          "4.00000000",
          false,
          true,
          109,
          "0.0000"
        ]
      ]
    ],
    [
      5,
      "Litecoin",
      "LTC",
      0,
      6,
      "0.00500000",
      1,
      null,
      "^(ltc|[LM3])[0-9a-zA-Z]{26,40}$",
      true,
      [
        [
          186,
          8,
          "",
          "LTC",
          4,
          "0.00500000",
          true,
          true,
          0,
          "0.0000"
        ]
      ]
    ]
  ];
  public static pairs = [
    [
      1,
      "BTC/USDT",
      4,
      1,
      2,
      6,
      "10.00000000",
      "0.00000100",
      1,
      0,
      "Bitcoin",
      "BTC",
      6,
      "0.00050000",
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      [
        0,
        0,
        0,
        0,
        0
      ],
      false,
      0
    ],
    [
      2,
      "ETH/BTC",
      1,
      3,
      6,
      6,
      "0.00010000",
      "0.00100000",
      1,
      0,
      "Ethereum",
      "ETH",
      6,
      "0.00650000",
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      [
        0,
        0,
        0,
        0,
        0
      ],
      false,
      0
    ],
    [
      3,
      "TRY/BTC",
      1,
      2,
      8,
      2,
      "0.00010000",
      "1.00000000",
      1,
      0,
      "TRY",
      "TRY",
      0,
      "10.00000000",
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      [
        0,
        0,
        0,
        0,
        0
      ],
      false,
      0
    ],
    [
      4,
      "TRY/USDT",
      4,
      2,
      2,
      2,
      "10.00000000",
      "0.10000000",
      0,
      0
    ],
    [
      6,
      "ETH/USDT",
      4,
      3,
      2,
      6,
      "10.00000000",
      "0.00001000",
      1,
      0,
      "Ethereum",
      "ETH",
      6,
      "0.00650000",
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      [
        0,
        0,
        0,
        0,
        0
      ],
      false,
      0
    ],
    [
      7,
      "LTC/USDT",
      4,
      5,
      2,
      6,
      "10.00000000",
      "0.00001000",
      1,
      0,
      "Litecoin",
      "LTC",
      6,
      "0.00500000",
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      [
        0,
        0,
        0,
        0,
        0
      ],
      false,
      0
    ],
    [
      8,
      "DASH/USDT",
      4,
      6,
      2,
      6,
      "10.00000000",
      "0.00001000",
      0,
      0
    ],
    [
      9,
      "LTC/BTC",
      1,
      5,
      6,
      6,
      "0.00010000",
      "0.01000000",
      1,
      0,
      "Litecoin",
      "LTC",
      6,
      "0.00500000",
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      [
        0,
        0,
        0,
        0,
        0
      ],
      false,
      0
    ]
  ];
}


