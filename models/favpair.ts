// import { PairI, Pairs } from './market';
import { ApiCall } from '../helpers/apicall';
// import { User } from './user';
// import { Storage } from '../helpers/storage';
import { sleep } from '../helpers/common';
import { disptachFavPairUpdate } from '../redux/dispatch';
import { StorageClass } from '../helpers/storage';
import { User } from '../helpers/user';
import { PairI } from '../helpers/interfaces';

export class FavPair {
    private apiCall = ApiCall.getInstance();
    private readonly configkey = 'pairResetModel';

    private user = User.getInstance();
    private localKey = 'fvrtPair';
    public favPairs: number[] = [];
    private reinitComplete = false;
    private static instance: FavPair;
    private storage = StorageClass.getInstance();
    public initialized = false;
    public isFavInit = false;

    private constructor() {
        if (FavPair.instance) {
            throw new Error("Error: Instantiation failed: Use FavPair.getInstance() instead of new.");
        }
    }

    public static getInstance() {
        if (FavPair.instance == null) {
            FavPair.instance = new FavPair();
        }
        return this.instance;
    }
    public async getConfig(){
        let con =await this.storage.get(this.configkey);
        if(con){
          return await JSON.parse(con);
        }else{
            try {
                const timeMilliSecconds = new Date().getTime();
                const response = await (await fetch('https://cdn1.decoin.io/configs/conf.json?v=' + timeMilliSecconds)).json();
                if (response) {
                    await this.storage.set(this.configkey, JSON.stringify(response.timings))
                    return response.timings;
                }    
            } catch (error) {
            
            }
        
        }
      }
    public async reInit(pairId = 0, status = false) {
        this.reinitComplete = false;
        if(this.user.isLoggedIn()) {
            this.favPairs = (await this.apiCall.postAuth('account/get-favp', { 'Submit': '1' })).Result as number[];
        } else {
            this.favPairs = JSON.parse(await StorageClass.getInstance().get(this.localKey) ?? '[]') ?? [];
        }
        disptachFavPairUpdate(this.favPairs);
        this.reinitComplete = true;

        if(this.isFavInit){
            this.isFavInit = false;
            this.toggle(pairId, status);
        }
    }
    public async addPair(pairId: number) {
        await this.toggle(pairId, true);
    }
    public async removePair(pairId: number) {
        await this.toggle(pairId, false);
    }

    private async toggle(pairId: number, status: boolean) {
        while(!this.reinitComplete) {
            await sleep(10);
            this.isFavInit = true;
            await this.reInit(pairId, status);
        }
        if((status && this.favPairs.indexOf(pairId) > -1) || (!status && this.favPairs.indexOf(pairId) < 0)) {
            return true;
        }
        if(this.user.isLoggedIn()) {
            await this.apiCall.postAuth('account/update-favp', { Pair: pairId });
        } else {
            const fvrtarray = [...this.favPairs];
            const idx = fvrtarray.indexOf(pairId);
            if(idx > -1) {
                fvrtarray.splice(idx, 1)
            } else {
                fvrtarray.push(pairId);
            }
            await StorageClass.getInstance().set(this.localKey, JSON.stringify(fvrtarray));
        }
        if(status && this.favPairs.indexOf(pairId) < 0) {
            this.favPairs.push(pairId);
        } else {
            this.favPairs.splice(this.favPairs.indexOf(pairId), 1);
        }
        disptachFavPairUpdate(this.favPairs);
    }


    public init() {
        this.initialized = true;
    }

    public async updateFavPair(pair: PairI) {
        const body = { 'Pair': pair.id };
        const endPoint = 'account/update-favp';
        try {
            const resp = await this.apiCall.postAuth(endPoint, body);
            return resp.Status
        } catch (error) {
            return false;
        }
    }

    public async getFavPairs(): Promise<any> {
        try {
            const response = await this.apiCall.postAuth('account/get-favp', { 'Submit': '1' });
            return response;
            // 
            // const activefavpair = [];
            // response.Result = Object.values(response.Result);
            // for (let i = 0; i < response.Result.length; i++) {
            //     activefavpair.push(response.Result[i]);
            // }
            // response.Result = activefavpair;
            // return response
        } catch (error) {
            await sleep(2000);
            return await this.getFavPairs();
        }
    }
}
