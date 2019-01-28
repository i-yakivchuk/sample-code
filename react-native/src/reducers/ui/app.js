import createReducer from '../createReducer';
import * as ActionTypes from '../../constants/actions';
import { REHYDRATE } from 'redux-persist/constants';

const initialState = {
	location: null,
	rehydrated: false,
	apiEndpoint: null,
	isInternetAvailable: true,
	slideShowClosed: true,
	encryptPrivateKey: null,
	encryptPublicKey: null,
	encryptMessageToken: null
};


export const app = createReducer(initialState, {
	[ActionTypes.REHYDRATE_COMPLETE](state, action) {
		return Object.assign({}, state, { rehydrated: true })
	},
	[ActionTypes.LOGOUT_SUCCESS](state, action) {
		//preserve rehydration state on logout, so relogin will work
		return Object.assign({}, state, { encryptPrivateKey: null, encryptPublicKey: null, encryptMessageToken: null, rehydrated: true, slideShowClosed: true })
	},
	[ActionTypes.UPDATE_INTERNET_STATE_SUCCESS](state, action) {
		return Object.assign({}, state, { isInternetAvailable: action.payload })
	},
	[ActionTypes.SET_ENCRYPT_PRIVATE_KEY](state, action) {
		return Object.assign({}, state, { encryptPrivateKey: action.payload })
	},
	[ActionTypes.SET_ENCRYPT_PUBLIC_KEY](state, action) {
		return Object.assign({}, state, { encryptPublicKey: action.payload })
	},
	[ActionTypes.SET_ENCRYPT_MESSAGE_TOKEN](state, action) {
		return Object.assign({}, state, { encryptMessageToken: action.payload })
	},
	[ActionTypes.RESET_APP](state, action) {
		//preserve rehydration state
		return Object.assign({}, state, { encryptPrivateKey: null, encryptPublicKey: null, encryptMessageToken: null, rehydrated: true, slideShowClosed: false })
	},
	[ActionTypes.SIGNUP_SUCCESS](state, action) {
		return Object.assign({}, state, { apiEndpoint: action.payload.apiEndpoint, slideShowClosed: false })
	},
	[ActionTypes.LOGIN_SUCCESS](state, action) {
		return Object.assign({}, state, { apiEndpoint: action.payload.apiEndpoint })
	},
	[ActionTypes.CLOSE_SLIDESHOW](state, action) {
		return Object.assign({}, state, { slideShowClosed: true })
	},
	[REHYDRATE](state, action) {
		return Object.assign({}, state, {
			apiEndpoint: action.payload.ui && action.payload.ui.app && action.payload.ui.app.apiEndpoint
		})
	}
});
