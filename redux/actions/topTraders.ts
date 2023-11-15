import { FETCH_TRADERS, FILTER_TRADERS } from './types';
// import topTraders from '../../assets/top-traders.json'

export const fetchtraders = () => {
  return {
    type: FETCH_TRADERS,
    // payload: topTraders,
  }
};

export const filtertraders = (value: any) => {
  return (dispatch: any) => {
    dispatch({
      type: FILTER_TRADERS,
      payload: value,

    })
  }
};

