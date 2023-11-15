import { IOrder } from "../../services/userorders";
import { IWallet, IWalletInfo } from "../../services/userwallets";
import { USER_DATA } from "../actions/types";

const initialState = {
  wallet: {
    btcTotal: 0,
    usdTotal: 0,
    wallets: [],
    limits: {},
    limitsRead: []
  } as IWalletInfo,
  orders: [] as IOrder[]
}
const userDataReducer = (state = initialState, {type, payload}:any) => {
  switch (type) {
    case USER_DATA.SET_WALLETS:
        return {
          ...state,
          wallet: {...payload}
        };
    case USER_DATA.SET_ORDERS:
        return {
          ...state,
          orders: [ ...payload ]
        }
    default:
      return state;
  }
  
};

export default userDataReducer;
