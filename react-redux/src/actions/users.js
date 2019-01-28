/**
 * Created by ivan on 26.11.17.
 */
import * as api from '../api/users';
import { success, error } from 'react-notification-system-redux';
import * as userActionTypes from '../constants/actions';
import { SERVER_ERROR } from '../constants/errors';
import * as noti from '../constants/notifications';
import { history } from './../redux/store';
import { path } from 'ramda';


export const loginSuccess = (payload) => ({ type: userActionTypes.LOGIN_SUCCESS, payload: payload });
export const loginError = user => ({ type: userActionTypes.LOGIN_ERROR });
export const loginRequest = user => ({ type: userActionTypes.LOGIN_REQUEST });
export const login = (params) => (dispatch) => {
	dispatch(loginRequest);

	return api.login(params).then(res => {
			dispatch(loginSuccess(res));
		}).catch(e => {
			dispatch(loginError());
	});
};


export const logoutSuccess = () => ({ type: userActionTypes.LOGOUT_SUCCESS, payload: null });
export const logout = () => (dispatch) => {
	dispatch({ type: userActionTypes.LOGOUT_REQUEST });

	return api.logOut().then(res => {
		localStorage.removeItem('user');
		dispatch(logoutSuccess());
	}).catch(e => {
		localStorage.removeItem('user');
		dispatch(logoutSuccess());
	});
};


export const forgotPassword = (params) => (dispatch) => {
	dispatch({ type: userActionTypes.FORGOT_PASSWORD_REQUEST });

	return api.forgotPassword(params).then(res => {
		dispatch({ type: userActionTypes.FORGOT_PASSWORD_SUCCESS });
		dispatch(success({ title: noti.FORGOT_PASSWORD_COMPLITE_TITLE, message: noti.FORGOT_PASSWORD_COMPLITE_MSG, position: 'tc', autoDismiss: 3}));
		history.goBack();
	}).catch((errors) => {
		dispatch({ type: userActionTypes.FORGOT_PASSWORD_ERROR });
		dispatch(error({ title: SERVER_ERROR, message: errors.response.data ? errors.response.data : SERVER_ERROR, position: 'tc', autoDismiss: 3}));
	});
};

export const setUserLocation = (payload) => ({ type: userActionTypes.SET_USER_LOCATION, payload: payload });

export const updateCurrentUser = (user) => ({ type: userActionTypes.UPDATE_CURRENT_USER, payload: user });
export const savePersonalDataError = () => ({ type: userActionTypes.SAVE_PERSONAL_DATA_ERROR });
export const savePersonalDataRequest = () => ({ type: userActionTypes.SAVE_PERSONAL_DATA_REQUEST });
export const savePersonalData = (params) => (dispatch, getState) => {
	dispatch(savePersonalDataRequest());

	const { user: { current: { CustomerId } } } = getState();

	if (params.Password === '')
		delete params.Password;

	return api.savePersonalData(params, CustomerId).then(res => {
		dispatch(updateCurrentUser(res));
	}).catch(() => {
		dispatch(savePersonalDataError());
		dispatch(createErrorNotificationAction(error));
	});
};

function createErrorNotificationAction(error) {
	const responseData = path(['response', 'data'], error);

	return error({
		title: SERVER_ERROR,
		message: !responseData ? SERVER_ERROR : typeof responseData === 'string' ? responseData : JSON.stringify(responseData),
		position: 'tc',
		autoDismiss: 3
	});
};