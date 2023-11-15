import { ORDER_SIDE } from "../actions/types";
export interface _initialState {
  orderSide: string
}
const initialState: _initialState = {
  orderSide: 'buy'
}

const buySellReducer = (state = initialState, {type, payload}:any) => {
  switch (type) {
    case ORDER_SIDE:
    return {
        ...state,
        orderSide: payload
    };
    default:
      return state;
  }
  
};

export default buySellReducer;
