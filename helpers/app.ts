import { AppSettings } from "../config/config";

import { isEmptyString, isNullOrUndefined, sleep } from './common';
import { Info } from "./info";
import { StorageClass } from "./storage";
// import { BackgroundRunner } from "../services/backgroundtasks";

export interface Signature {
    key: string;
    nonce: number;
}

export enum AppState {
    NotInitialized, InitializedByEmpty, Initialized
}

export class App {
    private info: any = {};
    private storage = StorageClass.getInstance();
    private infoInstance = Info.getInstance();
    private old: boolean = false;
    // private encrypt: IEncrypt;
    private state: AppState = AppState.NotInitialized;
    private static instance: App;

    private constructor() {
        if (App.instance) {
            throw new Error("Error: Instantiation failed: Use App.getInstance() instead of new.");
        }
    }
    // public setEncryptInstance(_encrypt: IEncrypt) {
        // this.encrypt = _encrypt;
    // }
    public static getInstance() {
        if (App.instance == null) {
            App.instance = new App();
        }
        return this.instance;
    }
    public async initialize() {
        // this.getTranslation('en', false);
        await this.init();
        if (!await this.storage.exists('appRun') || !this.isInited()) {
            this.state = AppState.InitializedByEmpty;
        } else {
            await this.init();
            this.state = AppState.Initialized;
        }
    }
    // public async AppfirstInit() {
    //     await this.firstTimeInit(this.encrypt.generateNewKey());
    // }
    public getState(): AppState {
        return this.state;
    }
    public async firstTimeInit(key: any) {
        try {
            const body1: any = {
                'PublicKey': key.public,
                'Platform': 1
            }
            const params1 = Object.keys(body1).map((key: any) => encodeURIComponent(key) + '=' + encodeURIComponent(body1[key])).join('&');
            const response = await (await fetch(AppSettings.apiEndpoint + (!this.old ? 'home/new-client' : 'home/initialize'), {
                method: 'POST',
                "headers": {
                    "content-type": "application/x-www-form-urlencoded",
                },
                body: params1,
            })).json();
            if (!this.old) {
                if (!response.Status)
                    throw new Error("Error");
                response.Result.PrivateKey = key.private;
                this.save(JSON.stringify(response.Result));
            } else if (response['Error'] === undefined) {
                this.save(JSON.stringify(response));
            }
            this.storage.set('appRun', "1");
        } catch (err) {
            
            await sleep(2000);
            await this.firstTimeInit(key);
        }
    }
    public async appInitialized() {
        return await this.storage.exists('appCreds');
    }
    public async init() {
        const appCreds = await this.storage.tryGet('appCreds');

        if (appCreds.hasValue) {
            await this.storage.set('appCreds', appCreds.value);
            await this.storage.remove('appCreds');
        }

        this.info = JSON.parse(await this.storage.get('appCreds') ?? '{}');
        if ((!this.old && isNullOrUndefined(this.info.PrivateKey) && (!isNullOrUndefined(this.info.Id) || this.info?.PrivateKey?.length > 74))) {
            this.reset();
        }
    }
    private isInited(): boolean {
        return !isEmptyString(this.info.PrivateKey);
    }
    public async reset() {
        await this.storage.remove('appCreds');
        await this.storage.remove('appRun');
        this.info = {};
    }
    public async reInit() {
        this.reset();
        this.initialize();
    }

    public async save(creds: string) {
        await this.storage.set('appCreds', creds);

        this.init();
    }
    public getPrivateKey() {
        return this.info['PrivateKey'];
    }
    public isPrivateKeyValid() {
        return (this.info['PrivateKey'] ?? '').length <= 74;
    }
    public getPublicKey() {
        return this.info['PublicKey'];
    }
    public getSecret() {
        return this.info['Secret'];
    }
    public appInited(): boolean {
        return this.info != null && this.info['PublicKey'] != null;
    }
    public async generateSignature(requestUrl: string, requestType: string, requestBody: any) {
        if (this.info === null) {
            throw new Error("Info not initialized");
            // return null;
        }
        const body1: any = {};

        for (const key in requestBody) {
            if (!(new RegExp('picture|file|_|recaptcharesponse')).test(key.toLocaleLowerCase())) {
                body1[key] = requestBody[key] !== null ? requestBody[key].toString() : requestBody[key];
            }
        }

        if (isNullOrUndefined(this.getSecret()) || !this.isPrivateKeyValid()) {
            await this.init();
        }
        const body = JSON.stringify(body1);
        const nonce: number = Date.now() + this.infoInstance.getTimeOffset();
        // let signature = Base64.stringify(sha256(this.getSecret() + requestUrl + requestType + body));
        // const sig = await BackgroundRunner.getInstance().generateSignatureFromHmac(this.getPrivateKey(), this.getSecret(), signature, nonce);
        // if(sig.status) {
        //   return sig.result;
        // }
        // signature = (hmacSHA512(signature + nonce, this.getSecret()));
        // return {
        //     key: this.old ? signature.toString() : await this.encrypt.sign(signature),
        //     nonce: nonce
        // };
    }
    public getId() {
        return this.info['Id'];
    }

    public async checkEnviroment() {
        return (await this.storage.get('enviroment') == AppSettings.apiEndpoint)
    }

    public async saveEnviroment() {
        await this.storage.set('enviroment', AppSettings.apiEndpoint);
    }

}
