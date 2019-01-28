import * as ActionTypes from '../../constants/actions';
import createReducer from '../createReducer';

const initialState = {
	loading: false,
  players: [],
	error: false
};

export const systemStatus = createReducer(initialState, {
  [ActionTypes.GET_SYSTEM_STATUS_PLAYERS_REQUEST](state) {
	  return Object.assign({}, state, { players: [], error: false, loading: true })
  },
  [ActionTypes.GET_SYSTEM_STATUS_PLAYERS_SUCCESS](state, action) {
    return Object.assign({}, state, { players: action.payload.sort((a, b) => new Date(b.LastConnection) - new Date(a.LastConnection)), loading: false })
  },
  [ActionTypes.GET_ARCHIVE_MESSAGES_ERROR](state) {
	  return Object.assign({}, state, { players: [], error: true, loading: false })
  }
});
