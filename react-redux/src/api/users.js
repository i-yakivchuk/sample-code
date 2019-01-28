/**
 * Created by ivan on 26.11.17.
 */
import Api from './api';
const path = '/login';

export function login(params) {
	return Api.post(`${path}/login`, params);
}

export function logOut() {
	return Api.post(`${path}/logout`, {});
}

export function forgotPassword(params) {
	return Api.post(`${path}/forgotPassword`, params);
}

export function getPersonalData({ customerId }) {
	return Api.post(`/Settings/GetPersonalData`, { params: { customerId }, credentials: 'sso' });
}

export function savePersonalData(data, customerId) {
	return Api.post(`/Settings/SavePersonalData`, data, { params: { customerId }, credentials: 'sso' });
}