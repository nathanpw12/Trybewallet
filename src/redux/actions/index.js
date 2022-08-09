import getCurrentApi from '../../services/getCurrentApi';
import {
  ADD_EXPENSE,
  LOGIN_SUBMIT,
  RECEIVE_API_ERROR,
  RECEIVE_API_SUCCESS,
  REQUEST_API,
  TOTAL_SUM,
} from './actionType';

export const loginAction = (state) => ({ type: LOGIN_SUBMIT, state });

export const requestApi = () => ({
  type: REQUEST_API,
});

export const receiveApiSucess = (response) => ({
  type: RECEIVE_API_SUCCESS,
  currencies: response,
});

export const receiveApiError = (error) => ({
  type: RECEIVE_API_ERROR,
  error,
});

export function fetchApi() {
  return async (dispatch, getState) => {
    console.log(getState);
    dispatch(requestApi());
    try {
      const response = await getCurrentApi();
      const responseFilter = Object.keys(response).filter((key) => key !== 'USDT');
      dispatch(receiveApiSucess(responseFilter));
    } catch (error) {
      dispatch(receiveApiError(error));
    }
  };
}

export const addExpenses = (state) => ({
  type: ADD_EXPENSE,
  payload: state,
});

export const sumAction = (amount) => ({
  type: TOTAL_SUM,
  payload: amount,
});
