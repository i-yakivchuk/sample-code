/**
 * Created by ivan on 24.03.18.
 */
import * as api from '../api/players';
import * as playerPreviewActions from '../constants/actions';
import { store } from '../redux/store';
import CONFIG from '../config'


const prePlayers = (payload) => {
	payload.map((player) => { player.PlayerPreviewSrcLink = `${CONFIG.NCPLAYER_URL}?id=${player.ActivationCode}`; });
	
	return { payload: payload };
};


export const getPlayersSuccess = (payload) => ({ type: playerPreviewActions.GET_PLAYER_PREVIEW_SUCCESS, ...prePlayers(payload) });
export const getPlayersError = players => ({ type: playerPreviewActions.GET_PLAYER_PREVIEW_ERROR });
export const getPlayersRequest = players => ({ type: playerPreviewActions.GET_PLAYER_PREVIEW_REQUEST });
export const getPlayers = (params) => (dispatch) => {
	const customerId = store.getState().user.current.CustomerId;
	dispatch(getPlayersRequest());

	return api.players({customerId: customerId}).then(res => {
		dispatch(getPlayersSuccess(res.data));
	}).catch(() => dispatch(getPlayersError()));
};

//select player
export const selectPlayer = (payload) => ({ type: playerPreviewActions.SELECT_PLAYER_PREVIEW, payload: payload });
export const selectNextPlayer = (payload) => ({ type: playerPreviewActions.SELECT_NEXT_PLAYER_PREVIEW });
export const selectPreviewPlayer = (payload) => ({ type: playerPreviewActions.SELECT_PREVIEW_PLAYER_PREVIEW });