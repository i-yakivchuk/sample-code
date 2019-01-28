import * as api from '../api/authors';
import { store } from '../redux/store';
import * as slideActionTypes from '../constants/actions';

export const authorsSuccess = (payload) => ({ type: slideActionTypes.GET_AUTHORS_SUCCESS, payload: payload });
export const authorsError = authors => ({ type: slideActionTypes.GET_AUTHORS_ERROR });
export const authorsRequest = authors => ({ type: slideActionTypes.GET_AUTHORS });
export const authors = (params) => (dispatch) => {
  let customerId = store.getState().user.current.CustomerId;
  dispatch(authorsRequest());

  return api.authors({customerId}).then(res => {
    dispatch(authorsSuccess(res.data));
  }).catch(e => {
    dispatch(authorsError());
  });
};