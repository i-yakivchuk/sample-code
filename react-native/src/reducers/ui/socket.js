/**
 * Created by ivan on 25.03.18.
 */
import createReducer from '../createReducer';
import * as ActionTypes from '../../constants/actions';


const initialState = {
	connect: false,
	error: false,
	reconnect: false,
	call: null
};


export const socket = createReducer(initialState, {
	[ActionTypes.SOCKET_CONNECT](state, action) {
		return Object.assign({}, state, { connect: true })
	},
});
