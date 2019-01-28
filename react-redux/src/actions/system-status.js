/**
 * Created by ivan on 27.02.18.
 */
import * as api from '../api/system-status';
import { store } from '../redux/store';
import * as action from '../constants/actions';


//get players for system status page
export const getSystemStatusPlayersSuccess = (payload) => ({ type: action.GET_SYSTEM_STATUS_PLAYERS_SUCCESS, payload: payload });
export const getSystemStatusPlayersError = () => ({ type: action.GET_SYSTEM_STATUS_PLAYERS_ERROR });
export const getSystemStatusPlayersRequest = () => ({ type: action.GET_SYSTEM_STATUS_PLAYERS_REQUEST });
export const getSystemStatus = () => (dispatch) => {
	const customerId = store.getState().user.current.CustomerId;
	dispatch(getSystemStatusPlayersRequest());

	return api.getPlayers(customerId).then(res => {
		dispatch(getSystemStatusPlayersSuccess(res.data));
	}).catch(() => {
		dispatch(getSystemStatusPlayersError());
	});
};
