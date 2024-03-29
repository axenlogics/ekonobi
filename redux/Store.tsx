import { combineReducers, legacy_createStore as createStore, applyMiddleware } from 'redux';
// import { legacy_createStore as createStore } from 'redux';
import thunk from 'redux-thunk'
import authReducer from './reducers/auth';
import pairReducer from './reducers/pair';
import orderBookReducer from './reducers/orderBook';
import walletReducer from './reducers/wallet';
import traderReducer from './reducers/topTraders';
import userDataReducer from './reducers/userdata';
import buySellReducer from './reducers/buySell';
import favPairReducer from './reducers/favpair';

export interface IReducers {
  pairReducer: any,
  authReducer: any,
  orderBookReducer: any,
  walletReducer: any,
  traderReducer: any,
  userDataReducer: any,
  buySellReducer: any,
  favPairReducer: any
}

const rootReducer = combineReducers({
  pairReducer: pairReducer,
  authReducer: authReducer,
  orderBookReducer: orderBookReducer,
  walletReducer:walletReducer,
  traderReducer:traderReducer,
  userDataReducer: userDataReducer,
  buySellReducer: buySellReducer,
  favPairReducer: favPairReducer
})

export const store = createStore(rootReducer, applyMiddleware(thunk));

