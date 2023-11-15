// import { CurrencyI } from "../models/market";

export interface UserI {
    mobile?: string,
    email?: string,
    firstName?: string,
    lastName?: string,
    password?: string,
    referaCode?: string,
}
export interface signUpI {

}
export interface UserInfoI {

}
export interface ApiResponse {
    Status?: boolean;
    Result?: any;
    Message?: string;
    Code?: number;
}
export interface ApiResponseI {
    Status?: boolean;
    Result?: any;
    Message?: string;
    Code?: number;
}
export interface StkCurrencies {
    id?: number;
    currency?: CurrencyI;
    stakingPlan?: StkPlansI[];
    minLocked?: number;
    planNotFound?: boolean;
    allDuration?: number[];
}
export interface StkPlansI {
    id?: number;
    duration?: number;
    apy?: number;
    currency?: CurrencyI;
    startDate?: string;
    endDate?: string;
    stakeAmount?: number;
    earned?: any;
    youReceive?: number;
    daysPassed?: number;
    totalDays?: number;
    status?: number;
    selected?: boolean;
    minLocked?: number;
}
export interface PairI {
    id?: number;
    name?: string;
    baseCurrency?: CurrencyI;
    marketCurrency?: CurrencyI;
    rate?: number;
    high?: number;
    low?: number;
    bid?: number;
    ask?: number;
    volume?: number;
    volumeMarketCurrency?: number;
    prevDayPrice?: number;
    trendUp?: boolean;
    trendUp24hr?: boolean;
    precision?: number;
    rateUsd?: number;
    basePrecision?: number;
    marketPrecision?: number;
    hide?: boolean;
    minimumTotal?: number;
    minimumAmount?: number;
    Status?: number;
    leveragePair?: boolean;
    leveragePercentage?: string;
    leveragePairName?: string;
    type?: number;
    change24hour?: PercentageI;
    twitterSentiment?: number,
    isFav?: boolean,
    isMainPair?: boolean,
}
export interface PercentageI {
    value: number;
    isPositive: boolean;
}
export enum currencyTypeI {
    Cryptocurrency, Fiat, Leverage, DStock
}
export interface CurrencyI {
    id?: number;
    name: string;
    symbol: string;
    leverageSymbol?: string;
    leveragePercentage?: string;
    address?: string;
    isFiat?: boolean;
    currencyType?: currencyTypeI;
    precision?: number;
    withdrawalFee?: number;
    status?: number;
    CustomFee?: TetherFee;
    feePer?: string;
    regex?: string;
    canWithdraw?: boolean;
    imgUrl?: string;
    chainInfoB?: ChaininfoI[] | any;
    chainInfo?: ChaininfoI[];
}
export interface ChaininfoI {
    chainId?: number;
    currencyId?: number;
    chainName?: string;
    withdrawFee?: number;
    canWithdraw?: boolean;
    canDeposit?: boolean;
    depositAddressCurrency?: number;
    isSelected?: {};
    feePer?: string;
    minWithdraw?: any;
}
export interface TetherFee {
    OMNI?: number;
    ERC20?: number;
    TRC20?: number;
}
export interface UserGroupLimit {
    currency?: CurrencyI;
    limitation?: string;
    consumed?: string;
}
export interface UserLocketBalanceLimit {
    currency?: CurrencyI;
    limit?: number;
}
export interface WalletI {
    id?: number;
    address?: string;
    isMemo?: boolean;
    memo?: number;
    balance?: number;
    available?: number;
    inOrderBalance?: number;
    backupAvailable?: number;
    pending?: number;
    currency?: CurrencyI;
    conf?: number;
    minW?: number;
    fiat?: Fiat;
    hide?: boolean;
    btcBalance?: number;
    defaultTradePair?: string;
    investedAmount?: number;
    percenTage?: number;
    currencyId?: number;
    minWithdraw?: any;
    inorderBalance?: any;
    withdrawalFee?: any;
}

export interface Fiat {
    bankName?: string;
    accountTitle?: string;
    accountNumber?: string;
    branchCode?: string;
}
export interface ResetTimeModel {
    days?: string;
    hours?: string;
    minuts?: string;
    secconds?: string;
}
export interface showPoupModel {
    secconds?: number;
    showPopUP?: boolean;
    stockTradeDisabled?: boolean;
    tradingHalt?: boolean;
}
export interface pairResetSettingModel {
    start?: string;
    end?: string;
    tstart?: string;
    recur?: string;
    dayoff?: any[];
}
export interface BuySellI {
    price?: number,
    amount?: number,
    total?: number,
    percentage?: number,
    minP?: number,
    minA?: number,
}
export interface userSettingsI{
    pairMenu :{
        selectedTab?: '',
        sorting?:{
            faverite?: boolean,
            name?:boolean,
            price?:boolean,
            change24h?: boolean,
            volume24h?: boolean,
        }
    }
}
export const LoginEmails: UserI[] = [
    { email: 'ekonobi@gmail.com', password: '123' },
    {email: 'babarzech@gmail.com', password: 'Babar123'},
    { email: 'admin@gmail.com', password: '123' },
    { email: 'admin@admin.com', password: '123' },


]