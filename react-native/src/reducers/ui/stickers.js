import createReducer from '../createReducer';
import * as ActionTypes from '../../constants/actions';
import R from "ramda";

const initialState = {
	packs: [],
	baseUrl: null,
	loading: false,
	selectedId: null,
	selectedPack: null,
};


export const stickers = createReducer(initialState, {
	[ActionTypes.GET_STICKER_PACKS_SUCCESS](state, action) {
		return Object.assign({}, state, { baseUrl: action.payload.baseUrl, packs: action.payload.packs })
	},
	[ActionTypes.SELECT_STICKER_PACK_REQUEST](state, action) {
		return Object.assign({}, state, { selectedPack: null, selectedId: action.payload.id, loading: true })
	},
	[ActionTypes.SELECT_STICKER_PACK_SUCCESS](state, action) {
		return Object.assign({}, state, { selectedPack: action.payload, loading: false })
	},
});
