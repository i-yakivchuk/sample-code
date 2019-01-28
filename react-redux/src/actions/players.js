import * as api from '../api/players';
import { success, error } from 'react-notification-system-redux';
import * as slideActionTypes from '../constants/actions';

export const togglePlayer = (payload) => ({ type: slideActionTypes.SELECT_PLAYER, payload: payload });
export const toggleAllPlayers = (payload) => ({ type: slideActionTypes.SELECT_ALL_PLAYERS, payload: payload });
export const setSelectedPlayers = (payload) => ({ type: slideActionTypes.PLAYERS_SELECTED, payload: payload });

export const userPlayersSuccess = (payload) => ({ type: slideActionTypes.GET_USER_PLAYERS_SUCCESS, payload: payload });
export const userPlayersError = players => ({ type: slideActionTypes.GET_USER_PLAYERS_ERROR });
export const userPlayersRequest = players => ({ type: slideActionTypes.GET_USER_PLAYERS });
export const userPlayers = (params) => (dispatch) => {
  dispatch(userPlayersRequest());

  return api.players(params).then(res => {
    dispatch(userPlayersSuccess(res.data));
  }).catch(e => {
    dispatch(userPlayersError());
  });
};