import { request } from '../../../services';
import User from '../../../models/user';
import { LoginFieldsFirstStage, SignUpFormFields, LoginFieldsSecondStage } from '../../../types';
import { LOGIN, SIGNUP, LOGIN_2FA, LOGIN_2FA_CONFIRM } from '../../../constants/endpoints';


export function login(credentials: LoginFieldsFirstStage): Promise<User> {
    return request.post(LOGIN, {body: credentials});
}

export const login2fa = (sessionkey: {sessionkey: string}) => {
    return request.post(LOGIN_2FA, {body: sessionkey});
}

export const login2faConfirm = (credentials: LoginFieldsSecondStage & {sessionkey: string}) => {
    return request.post(LOGIN_2FA_CONFIRM, {body: credentials});
}

export function signup(userProps: SignUpFormFields) {
	return request.post(SIGNUP, {body: userProps});
}