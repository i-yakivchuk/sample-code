/**
 * Created by ivan on 15.03.18.
 */
import request from './request';
import R from 'ramda';

export function getUser(email) {
	return request.get('user');
}

export function update(params) {
	return request.post('user', params);
}

export function login(email, password) {
	const params = { email, password };
	return request.post('user/auth', params);
}

export function login2fa(sessionkey) {
	const params = { sessionkey };
	return request.post('user/request_2fa', params);
}

export function login2faConfirm(sessionkey, sms_code) {
	const params = { sessionkey, sms_code };
	return request.post('user/confirm_2fa', params);
}

export function logout(deviceId) {
	const params = { deviceId };
	return request.post('user/logout', params);
}

export function signup(params) {
	return request.post('user/register', params);
}

export function pushToken(fcmToken, voIpToken, device) {
	let params = { device };
	if (fcmToken) params.token = fcmToken;
	if (voIpToken) params.voIpToken = voIpToken;
	return request.post('push', params);
}
