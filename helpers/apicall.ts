// import { AppSettings } from "../config/config";
// import { App, Signature } from "../models/app";
// import { User } from "../models/user";
// import { isNullOrUndefined, sleep } from "./common";
// import { Encrypt } from "./encrypt";
// import hmacSHA256 from 'crypto-js/hmac-sha256';
// import Constants from 'expo-constants';
// import { Platform } from "react-native";
// import App from '../App';
// import { AppSettings } from '../../config/config';
import { AppSettings } from './config';
import { User } from './user';


export class ApiCall {
    private static instance: ApiCall;
    // private app = App.getInstance();
    private user = User.getInstance();
    // public encrypt = new Encrypt();
    private userAgent?: string;
    constructor() {
        if (ApiCall.instance) {
            throw new Error("Error: Instantiation failed: Use ApiCall.getInstance() instead of new.");
        }
    }
    public static getInstance() {
        if (ApiCall.instance == null) {
            ApiCall.instance = new ApiCall();
        }
        return this.instance;
    }
    public async getAuth(auth: any){
     return auth;
    }
    public async post(endpoint: string, body: object, shoudlEncrypt: boolean = false) {
        return await this._post(endpoint, body, false, shoudlEncrypt);
    }
    public async postAuth(endpoint: string, body: object, shoudlEncrypt: boolean = false) {
        return await this._post(endpoint, body, true, shoudlEncrypt);
    }
    public async uploadimage(endpoint: string, body: any, shoudlEncrypt: boolean = false) {
        return await this._UploadImage(endpoint, body, true, shoudlEncrypt);
    }
    // public async halfAuth(endpoint: string, body: object, shoudlEncrypt: boolean = false) {
    //     // const isHalfLogin = Object.keys(this.user.getInfo()).length !== 0 && !this.user.isLoggedIn();
    //     return await this._post(endpoint, body, shoudlEncrypt, true, true, true);
    // }
    private async _post(endpoint: string, body: object, isAuthenticated?: boolean, shoudlEncrypt?: boolean, retry: boolean = true, isHalfLogin = false): Promise<any> {
        // const body1: any = shoudlEncrypt ? this.encrypt.encryptObject(body) : Object.assign({}, body);
        const body1: any = shoudlEncrypt ? (body) : Object.assign({}, body);
        // const url = AppSettings.apiEndpoint + endpoint;
        // const signature: Signature = await this.app.generateSignature(url, 'POST', body1);

        try {
            var myHeaders = new Headers();

            if (isAuthenticated && User.getInstance().getToken()) {
                myHeaders.append("Authorization", "Bearer " + User.getInstance().getToken());
                // myHeaders.append("Access-Control-Allow-Origin", "*");
            } else if (isAuthenticated && !User.getInstance().getToken()) {
                return {
                    Status: false,
                    Message: 'Please login to continue',
                    Result: null,
                    code: 5,
                }
            }
            // 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
            myHeaders.append('Content-Type', 'application/x-www-form-urlencoded;charset=UTF-8')
            // const form_data = new FormData();

            // for (var key in body) {
            //     form_data.append(key, JSON.stringify(body1[key]));
            // }
            const form_data = Object.keys(body1).map(key => encodeURIComponent(key) + '=' + encodeURIComponent(body1[key])).join('&');

            

            const httpResp = await fetch(AppSettings.apiEndpoint + endpoint, {
                // body: form_data,
                // method: 'POST',
                headers: myHeaders,
                method: 'POST',
                // body: form_data,
                body: (form_data),

                // body: isAuthenticated ? (body) : JSON.stringify(body),
                redirect: 'follow'
            });
            

            const response = await (httpResp).json();
            
            if (response.Status) {
                response.Status = await JSON.parse(response.Status);

            }
            // response.Message = await JSON.stringify(response.Message);


            // if (httpResp.status == 401) {
            // this.user.logout();
            // }
            // if (response.Status === false && response.Message === "IR" && isAuthenticated && retry) {
            //     await sleep(1000);
            //     return await this._post(endpoint, body, shoudlEncrypt, isAuthenticated, false);
            // } else {

            // 
            return (response);
            // }
        } catch (err) {
            // 
            return {
                Status: false,
                Message: 'Some thing went wrong please contact site administrator',
                Result: err,
                code: 0,
            }
            // 
        }
    }
    public async get(endpoint: string, isAuthenticated?: boolean, shoudlEncrypt?: boolean, retry: boolean = true, isHalfLogin = false) {
        // const body1: any = shoudlEncrypt ? (body) : Object.assign({}, body);
        try {
            var myHeaders = new Headers();
            if (isAuthenticated && User.getInstance().getToken()) {
                myHeaders.append("Authorization", "Bearer " + User.getInstance().getToken());
            } else if (isAuthenticated && !User.getInstance().getToken()) {
                return {
                    Status: false,
                    Message: ('Please login to continue'),
                    Result: null,
                    code: 5,
                }
            }
            
            const httpResp = await fetch(AppSettings.apiEndpoint + endpoint, {

                headers: myHeaders,
                method: 'GET',
                redirect: 'follow'
            });
            
            const response = await (httpResp).json();
            response.Status = await JSON.parse(response.Status);


            // if (httpResp.status == 401) {
            // this.user.logout();
            // }
            // if (response.Status === false && response.Message === "IR" && isAuthenticated && retry) {
            //     await sleep(1000);
            //     return await this._post(endpoint, body, shoudlEncrypt, isAuthenticated, false);
            // } else {
            // 
            return response;
            // }
        } catch (err) {
            return {
                Status: false,
                Message: 'Some thing went wrong please contact site administrator',
                Result: err,
                code: 0,
            }
            // 
        }
        // return await (await fetch(AppSettings.apiEndpoint + endPoint)).json();
    }
    private getFormData(result: any) {
        // Display the camera to the user and wait for them to take a photo or to cancel
        // the action


        try {
            // ImagePicker saves the taken photo to disk and returns a local URI to it
            // let localUri = result;
            // let filename = localUri.split('/').pop();

            // // Infer the type of the image
            // let match = /\.(\w+)$/.exec(filename);
            // let type = match ? `image/${match[1]}` : `image`;
            
            // Upload the image using the fetch and FormData APIs

            // Assume "photo" is the name of the form field the server expects
            // const ob: any = { uri: localUri, name: filename, type };
            let formData1 = new FormData();
            formData1.append('file', JSON.stringify(result));
            formData1.append("type", "asset");
            formData1.append("from", "client_files");
            return formData1;
        } catch (error) {
            console.error(error);

            let formData1 = new FormData();
            return formData1;
        }


        // return await fetch(YOUR_SERVER_URL, {
        //     method: 'POST',
        //     body: formData,
        //     headers: {
        //         'content-type': 'multipart/form-data',
        //     },
        // });
    }
    private async _UploadImage(endpoint: string, body: File, isAuthenticated?: boolean, shoudlEncrypt?: boolean, retry: boolean = true, isHalfLogin = false): Promise<any> {
        // const body1: any = shoudlEncrypt ? this.encrypt.encryptObject(body) : Object.assign({}, body);
        // const body1: any = shoudlEncrypt ? (body) : Object.assign({}, body);
        // const url = AppSettings.apiEndpoint + endpoint;
        // const filebody = body;
        // const signature: Signature = await this.app.generateSignature(url, 'POST', body1);
        // 
        let res: any;
        let httpres: any = 0;
        try {
            var myHeaders = new Headers();

            if (isAuthenticated && User.getInstance().getToken()) {
                myHeaders.append("Authorization", "Bearer " + User.getInstance().getToken());
                // myHeaders.append('content-type', 'multipart/form-data');
                // headers.append('Content-Type', 'multipart/form-data');
                // myHeaders.append('Accept', 'application/json');

            } else if (isAuthenticated && !User.getInstance().getToken()) {
                return {
                    Status: false,
                    Message: 'Please login to continue',
                    Result: null,
                    code: 5,
                }
            }

            // 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
            // myHeaders.append('Content-Type', 'multipart/form-data;')
            // 

            // const form_data = this.getFormData(body1)
            let formData1 = new FormData();
            // formData.append("file", file, file.name);

            formData1.append('file', body, body.name);
            // formData1.append("type", "asset");
            // formData1.append("from", "client_files");
            // for (var key in body1) {
            //     form_data.append(key, body1[key]);
            // }
            // const form_data = Object.keys(body1).map(key => encodeURIComponent(key) + '=' + encodeURIComponent(body1[key])).join('&');

            // 

            const httpResp = await fetch(AppSettings.apiEndpoint + endpoint, {
                // body: form_data,
                // method: 'POST',
                headers: myHeaders,
                method: 'POST',
                // body: form_data,
                body: formData1,

                // body: isAuthenticated ? (body) : JSON.stringify(body),
                redirect: 'follow'
            });
            
            httpres = httpResp;
            const response = await (httpResp).json();
            
            // if (response.Status) {
            //     response.Status = await JSON.parse(response.Status);

            // }
            // response.Message = await JSON.stringify(response.Message);


            // if (httpResp.status == 401) {
            // this.user.logout();
            // }
            // if (response.Status === false && response.Message === "IR" && isAuthenticated && retry) {
            //     await sleep(1000);
            //     return await this._post(endpoint, body, shoudlEncrypt, isAuthenticated, false);
            // } else {

            // 
            return response;
            // }
        } catch (err) {
            return {
                Status: false,
                Message: 'Some thing went wrong please contact site administrator',
                Result: err,
                code: httpres.status,
            }
            // 
        }
    }
    // public async getAuth(body: object): Promise<object> {
    //     body = this.encrypt.encryptObject(body);
    //     const signature: Signature = await this.app.generateSignature('', 'POST', body);
    //     return {
    //         'XSig': signature.key,
    //         'XNonce': signature.nonce.toString(),
    //         'XRef': this.app.getId().toString(),
    //         'UserAuthenticationToken': this.user.getTokenSignature(signature),
    //         'XTi': this.user.getTokenId()
    //     };
    // }

    // public async postAuthTemporary(endpoint: string, body: object, token: any, shoudlEncrypt: boolean = false) {
    //     return await this.posttemporary(endpoint, body, shoudlEncrypt, token);
    // }
    // private async posttemporary(endpoint: string, body: object, shoudlEncrypt: boolean, token: any) {
    //     const body1: any = shoudlEncrypt ? this.encrypt.encryptObject(body) : Object.assign({}, body);
    //     const url = AppSettings.apiEndpoint + endpoint;
    //     const signature: Signature = await this.app.generateSignature(url, 'POST', body1);

    //     var headers: any = {
    //         'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
    //         'x-sig': signature.key,
    //         'x-nonce': signature.nonce.toString(),
    //         'x-ref': this.app.getId().toString()
    //     };
    //     headers['user-auth-token'] = hmacSHA256(token.Token, signature.key).toString();
    //     headers['x-ti'] = token.TI

    //     const params = Object.keys(body1).map(key => encodeURIComponent(key) + '=' + encodeURIComponent(body1[key])).join('&');
    //     try {
    //         const httpResp = await fetch(AppSettings.apiEndpoint + endpoint, {
    //             body: params,
    //             method: 'POST',
    //             headers: headers
    //         });
    //         const response = await (httpResp).json()
    //         if (httpResp.status == 401) {
    //             this.user.logout();
    //         }
    //         if (response.Status === false && response.Message === "IR") {
    //             await sleep(1000);
    //             return await this._post(endpoint, body, shoudlEncrypt, false);
    //         } else {
    //             return response;
    //         }
    //     } catch (err) {
    //         // 
    //     }
    // }
}
