/**
 * Created by ivan on 24.03.18.
 */
import * as ActionTypes from '../../constants/actions';
import * as R from 'ramda';
import createReducer from '../createReducer';

const initialState = {
	list: [],
	selected: {},
	error: null
};

export const playerPreview = createReducer(initialState, {
	[ActionTypes.GET_PLAYER_PREVIEW_REQUEST](state, action) {
		return Object.assign({}, state, { list: [], error: null, loading: true })
	},
	[ActionTypes.GET_PLAYER_PREVIEW_SUCCESS](state, action) {
		return Object.assign({}, state, { list: action.payload, selected: R.head(action.payload), loading: false })
	},
	[ActionTypes.GET_PLAYER_PREVIEW_ERROR](state, action) {
		return Object.assign({}, state, { error: true, loading: false })
	},
	[ActionTypes.SELECT_PLAYER_PREVIEW](state, action) {
		return Object.assign({}, state, { selected: action.payload })
	},
	[ActionTypes.SELECT_NEXT_PLAYER_PREVIEW](state, action) {
		const selected = state.selected;
		let nextPlayer;

		if (selected) {
			state.list.map((player, index) => {
				if (player.Id === selected.Id) {
					nextPlayer = state.list[index + 1] ? state.list[index + 1] : state.list[0];
				}
			});
		}

		return Object.assign({}, state, { selected: nextPlayer })
	},
	[ActionTypes.SELECT_PREVIEW_PLAYER_PREVIEW](state, action) {
		const selected = state.selected;
		let previewPlayer;

		if (selected) {
			state.list.map((player, index) => {
				if (player.Id === selected.Id) {
					previewPlayer = state.list[index - 1] ? state.list[index - 1] : state.list[state.list.length - 1];
				}
			});
		}

		return Object.assign({}, state, { selected: previewPlayer })
	}
});
