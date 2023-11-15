import { ApiCall } from "../helpers/apicall";
import { toFixedFloor } from "../helpers/common";
import { ApiResponse, StkCurrencies, StkPlansI } from "../helpers/interfaces";
import { User } from "../helpers/user";
import { CommonJs } from "./commonjs";
// import { ApiResponse } from "./dtrade";
import { Currencies } from "./market";
// import { Currencies, CurrencyI } from "./market";
// import { User } from "./user";


const apiCaller = ApiCall.getInstance();
const commonjsIns = CommonJs.getInstance();
const user = User.getInstance();
const currencyIns = Currencies.getInstance();
export class StkHelper {
    public static instance: StkHelper;
    public allplans = [];
    public static getInstance(): StkHelper {
        if (StkHelper.instance == null) {
            StkHelper.instance = new StkHelper();
        }
        return this.instance;
    }
    public async getStkAll() {
        // Currencies
        // /staking/stake
        //     / staking / unstake
        //     / stake / get - available - plans
        //     / stake / get - active - plans
        // /stake/get-available-plans
        // /stake/get-active-plans
        // 
        // 
        // if (this.apiCall === undefined && this.inited) {
        //     this.apiCall = new ApiCall(this.http, this.router);
        // }
        // this.apiCall.endPoint = 'staking/get-available-plans';
        const body = {
        };
        // const body = { PhoneVerif: phoneVerif, Code: item };
        const endPoint = 'staking/get-available-plans';
        // const resp: any = '';
        // apiCaller.encrypt = false;
        const success: ApiResponse = await apiCaller.get(endPoint);
        // if (success.Status) {
        const curPlans: StkCurrencies[] = []
        // success.Result.forEach((stk: any) => {
        success.Result.forEach((stk: any) => {
            const curP: StkCurrencies = {};
            curP.currency = currencyIns.getCurrency(Number(stk[1]));
            curP.id = Number(stk[0]);
            curP.minLocked = stk[3] !== null ? stk[3] : 0.0001
            curP.stakingPlan = [];
            stk[4].forEach((pl: any) => {
                const plan: StkPlansI = {};
                plan.id = pl[0]
                plan.apy = Number(toFixedFloor(Number(pl[2]),2));
                plan.duration = pl[1];
                plan.minLocked = pl[3];
                curP?.stakingPlan?.push(plan);
            });
            if (curP.stakingPlan.length > 0) {
                this.setMaxPlanSelected(curP);
                curPlans.push(curP);
            }

        });
        this.timeSlotsUnique(curPlans);
        curPlans.forEach((stk)=>{
            stk?.stakingPlan?.sort((a, b) => { return a?.duration! - b?.duration! });
        })
        return curPlans;
    }
    public async getActiveStkPLans() {
        const body = {};
        // const body = { PhoneVerif: phoneVerif, Code: item };
        const endPoint = 'staking/get-active-plans';
        // const resp: any = '';
        // apiCaller.encrypt = false;
        const success: ApiResponse = await apiCaller.postAuth(endPoint, body, false);
        // 
        const curPlans: StkPlansI[] = [];
        if (success.Status) {
            success.Result.forEach((stk: any) => {
                // count++;
                // Apy: "10.0000"
                // CompletionDate: "21-08-2022"
                // CurrencyId: 1
                // Id: 2
                // Profit: "0.0052767123287671232876712329"
                // StakeAmount: "0.21400000"
                // StartDate: "23-05-2022"
                // stk.CompletionDate = this.makeDateValid(stk.CompletionDate);
                // stk.StartDate = this.makeDateValid(stk.StartDate);
                const curP: StkPlansI = {};
                // const curP: StkCurrencies = {};
                curP.currency = currencyIns.getCurrency(Number(stk.CurrencyId));
                // curP.currency = Currencies.getCurrency(Number(stk.CurrencyId));
                curP.id = Number(stk.Id);
                curP.apy = Number(toFixedFloor(Number(stk.Apy),2));
                curP.stakeAmount = Number(stk.StakeAmount);
                curP.earned =  toFixedFloor(stk.CurrentProfit, 8);
                // curP.earned = ( Number((curP.stakeAmount + Number(stk.Profit)).toFixed(8))/Number(this.dayCount(stk.StartDate, stk.CompletionDate, 'total'))) * Number(this.dayCount(stk.StartDate, stk.CompletionDate, 'passed'));
                curP.youReceive = Number((curP.stakeAmount + Number(stk.Profit)).toFixed(8));
                curP.daysPassed = Number(this.dayCount(stk.StartDate, stk.CompletionDate, 'passed')) ;
                curP.totalDays = Number(this.dayCount(stk.StartDate, stk.CompletionDate, 'total'));
                curP.startDate = this.formatDate(stk.StartDate);
                curP.endDate = this.formatDate(stk.CompletionDate);
                curPlans.push(curP);
            });
            
            // 
            curPlans.sort((a: any, b: any) => { return b.id - a.id });
            // callback(curPlans);
        }
        return curPlans;
        // 'staking/stake'
    }
    public formatDate(date: string) {
        const date1 = new Date(date);
        return date1.getDate() + '.' + (date1.getMonth() + 1) + '.' + date1.getFullYear();
    }
    public dayCount(start: any, end: any, type: any) {

        if (type === 'total') {
            const end1: any = new Date(end);
            const start1: any = new Date(start);
            const diffInMs = end1 - start1;
            return (diffInMs / (1000 * 60 * 60 * 24)).toFixed(0);
        } else {
            const end1: any = new Date(end);
            const start1: any = new Date(start);
            const start2: any = new Date();
            const daysRemain = (end1 - start2 / (1000 * 60 * 60 * 24)).toFixed(0)
            const totaldays = (end1 - start1 / (1000 * 60 * 60 * 24)).toFixed(0)
            // const days = (diffInMs / (1000 * 60 * 60 * 24));
            // const passeddays = days - 
            return (Number(totaldays) - Number(daysRemain)) < 0 ? 0 : (Number(totaldays) - Number(daysRemain)) ;
        }
    }
    public async stakeNow(stakeINfo: any) {
        const body = stakeINfo;
        // const body = { PhoneVerif: phoneVerif, Code: item };
        const endPoint = 'staking/stake';
        // const resp: any = '';
        // apiCaller.encrypt = false;
        const success: ApiResponse = await apiCaller.postAuth(endPoint, body, false);
        // 
        return success;
        // 'staking/stake'
    }
    // 'staking/get-active-plans'
    public async unstake(stakeINfo: any) {
        const body = stakeINfo;
        // const body = { PhoneVerif: phoneVerif, Code: item };
        const endPoint = 'staking/unstake';
        // const resp: any = '';
        // apiCaller.encrypt = false;
        const success: ApiResponse = await apiCaller.postAuth(endPoint, body, false);
        return success;
        // 'staking/stake'
    }
    public timeSlotsUnique(timeslots: StkCurrencies[]) {
        const slots: any = [];
        timeslots.forEach((stk: StkCurrencies) => {
            stk?.stakingPlan?.forEach((paln: StkPlansI) => {
                const finditem = slots.find((slot:any) => slot === paln.duration)
                if (!finditem) {
                    slots.push(paln.duration)
                }
            })
        });
        this.allplans = slots.sort((a:any, b:any) => { return a - b });
    }

    public setMaxPlanSelected(stkcur: StkCurrencies) {
        if (stkcur?.stakingPlan?.length !== 0) {
            const max: any = stkcur?.stakingPlan?.reduce((prev: StkPlansI, current: StkPlansI) => {
                return (prev?.duration! > current?.duration!) ? prev : current
            });
            max.selected = true;
        }
    }
    public static allPlans: any = {
        "Status": true,
        "Message": null,
        "Result": [
            [
                1,
                1,
                0,
                "0.0050",
                [
                    [
                        1,
                        30,
                        "365",
                        '0.002',
                        "2022-05-18T00:00:00.0000000Z",
                        0
                    ],
                    // [
                    //     2,
                    //     60,
                    //     "0.4000",
                    //     "2022-05-18T00:00:00.0000000Z",
                    //     0
                    // ],
                    [
                        3,
                        90,
                        "0.5000",
                        '0.003',
                        "2022-05-18T00:00:00.0000000Z",
                        0
                    ],
                    [
                        4,
                        120,
                        "365",
                        '0.005',
                        "2022-05-17T00:00:00.0000000Z",
                        0
                    ]
                ]
            ],
            [
                2,
                2,
                0,
                "1000.0000",
                [
                    [
                        5,
                        30,
                        "0.3000",
                        '0.13',
                        "2022-05-18T00:00:00.0000000Z",
                        0
                    ],
                    [
                        6,
                        60,
                        "0.4000",
                        '0.3',
                        "2022-05-18T00:00:00.0000000Z",
                        0
                    ],
                    [
                        7,
                        90,
                        "0.5000",
                        '0.03',
                        "2022-05-18T00:00:00.0000000Z",
                        0
                    ],
                    [
                        8,
                        365,
                        "0.8",
                        '0.53',
                        "2022-05-18T00:00:00.0000000Z",
                        0
                    ]
                ]
            ]
        ],
        "Code": 0
    }
}