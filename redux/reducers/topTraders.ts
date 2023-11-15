import { FILTER_TRADERS, FETCH_TRADERS} from "../actions/types";
// import topTradersData from '../../assets/top-traders.json'


const initialState = {
  // data: topTradersData,
  inputSearch: '',
  
}

const  traderReducer= (state = initialState, {type, payload}:any) => {
  switch (type) {
    case FILTER_TRADERS:
    return {
        ...state,
        inputSearch: payload,
    };
    case FETCH_TRADERS:
    return {
        ...state,
        data: payload,
    }
    default:
      return state;
  }
  
};

export default traderReducer;
