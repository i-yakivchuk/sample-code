import * as ActionTypes from '../../constants/actions';
import * as R from 'ramda';
import createReducer from '../createReducer';

const initialState = {
	loading: false,
  messages: [],
  selected: {},
	checkedAll: [],
	error: false
};

export const archive = createReducer(initialState, {
  [ActionTypes.GET_ARCHIVE_MESSAGES_REQUEST](state) {
	  return Object.assign({}, state, { messages:[], selected: {}, error: false, loading: true })
  },
  [ActionTypes.GET_ARCHIVE_MESSAGES_SUCCESS](state, action) {
    return Object.assign({}, state, { checkedAll: [], messages: action.payload.sort((a, b) => new Date(b.EndOn) - new Date(a.EndOn)), selected: R.head(action.payload), loading: false })
  },
  [ActionTypes.GET_ARCHIVE_MESSAGES_ERROR](state) {
	  return Object.assign({}, state, { error: true, loading: false })
  },
	[ActionTypes.SELECT_ARCHIVE_MESSAGE](state, action) {
		return Object.assign({}, state, { selected: action.payload, loading: false })
	},
	[ActionTypes.FILTER_ARCHIVE_MESSAGE](state, action){
		const list = action.payload.filter(state.messages);
		const selected = R.head(list.filter(obj => !obj.hide));
		return Object.assign({}, state, { messages: list, selected: selected || {}, checkedAll: [] })
	},
	[ActionTypes.CHECKED_ARCHIVE_MESSAGE](state, action) {
  	const { checked, id } = action.payload;
  	const all = state.checkedAll.filter((item) => checked || (!checked && item !== id));
  	checked && all.push(id);
		return Object.assign({}, state, { checkedAll: all, loading: false })
	},
	[ActionTypes.CHECKED_ALL_ARCHIVE_MESSAGES](state, action) {
		const all = action.payload ? state.messages.filter((item) => !item.hide).map((item) => item.Id) : [];
		return Object.assign({}, state, { checkedAll: all, loading: false })
	}
});
