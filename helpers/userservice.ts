import { StorageClass } from './storage';
// import hmacSHA256 from 'crypto-js/hmac-sha256';
// import { Signature } from './app';
// import { dispatchLoginState } from '../redux/dispatch';
// import { isEmptyString, isNullOrUndefined, sleep, __ } from '../helpers/common';
// import * as LocalAuthentication from 'expo-local-authentication';
// import { Notification, NotificationPosition, NotificationType } from '../helpers/notification';
import { ApiCall } from './apicall';
import { ApiResponse, ApiResponseI, LoginEmails, UserI, UserInfoI } from './interfaces';
import { User } from './user';



export class UserService {
    public initialized = false;
    private info!: UserInfoI;
    private readonly key: string = 'userInfo';
    private storage = StorageClass.getInstance();
    private static instance: UserService;

    // public localAuth: LocalAuth;
    private constructor() {
        if (UserService.instance) {
            throw new Error("Error: Instantiation failed: Use User.getInstance() instead of new.");
        }
        // this.localAuth = new LocalAuth(this.storage);
    }
    public static getInstance() {
        if (UserService.instance == null) {
            UserService.instance = new UserService();
        }
        return this.instance;
    }
    public async getFee() {

        const res = await ApiCall.getInstance().get('pkg/get-fees');
        return res;
    }
    public async ForgetPassword(modal: any) {
        const res = await ApiCall.getInstance().post('auth/reset-passwordd', modal, false);
        return res;
    }
    public async createOrder(modal: any) {
        const res = await ApiCall.getInstance().post('auth/createOrder', modal, false);
        return res;
    }
    public async createAccount(modal: any) {
        const res = await ApiCall.getInstance().post('auth/register', modal, false);
        return res;
    }
    public async logOut() {
        const res = await User.getInstance().logout1();
        if (res) {
            return {
                Status: true,
            } as ApiResponseI
        } else {
            // if (res) {
            return {
                Status: false,
            } as ApiResponseI
            // }
        }
    }
    public async loginNow(modal: UserI) {
        // const account = LoginEmails;
        // LoginEmails.forEach(account => {
        let match = false;
       
            // if (modal.email === account.email && modal.password === account.password) {
                // const res = await User.getInstance().save(modal);
                // match = true;
                const res = await ApiCall.getInstance().post('account/login', modal, true);
                return res;
            // }
       
        // if (match) {
        //     // if (res) {
        //     return {
        //         Status: true,
        //     } as ApiResponseI
        //     // }
        // } else {
        //     return {
        //         Status: false,
        //     } as ApiResponseI;
        // }

        // });
        // this.props.dispatch({ type: 'ISLOGGED_IN', payload: true });

        // auth/reset-passwordd
    }
}
