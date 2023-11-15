import { FAV_PAIRS } from "../actions/types";

export interface _initialState {
  favPairs: number[]
}

const initialState: _initialState = {
  favPairs: []
}

const favPairReducer = (state = initialState, {type, payload}:any) => {
  switch (type) {
    case FAV_PAIRS.SET:
      return {
        ...state,
        favPairs: [...payload]
      };
    default:
      return state;
  }
};

export default favPairReducer;
