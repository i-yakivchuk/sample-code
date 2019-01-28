import * as api from "./service";
import { SubmissionError } from 'redux-form';
import store from '../../configureStore';
import { successLogin } from './actions';
import { LoginFieldsFirstStage, SignUpFormFields, LoginFieldsSecondStage } from '../../../types';


export const login = (credentials: LoginFieldsFirstStage, set2faSessionkey: (sessionkey: string) => void) => () => {

    return api.login(credentials).then((data: any) => {
        // 1fa or 2fa login
        if ('token' in data) {
            store.dispatch( successLogin(data) )
        } else if ('sessionkey' in data && data.code === 106) {
            set2faSessionkey(data.sessionkey)
        }
    })
    .catch(error => {
        type response = {
            sessionkey: String, 
            code: Number, 
            error: boolean,
            message: String
        };
        return error.json().then(
            (response: response) => {
                throw new SubmissionError({_error: response.message})
            }
        )
    })
}

export const login2fa = (sessionkey: string, 
                         set2faConfirm: () => void,
                         set2faConfirmError: (message: string) => void) => {
    return api.login2fa({sessionkey}).then(() => {
        set2faConfirm()
    }).catch(error => {
        error.json().then(
            (response: any) => {
                const errorMessage = response.message;
                set2faConfirmError(errorMessage);
            }
        )
    })
}

export const login2faConfirm = (credentials: LoginFieldsSecondStage & {sessionkey: string}) => {
    return api.login2faConfirm(credentials).then((data: any) => {
        store.dispatch( successLogin(data) )
    }).catch(error => {
        return error.json().then(
            (response: any) => {
                throw new SubmissionError({_error: response.message})
            }
        )
    })
}

export const signUp = (userProps: SignUpFormFields, successRegistrationHandler: () => void) => () => {

    return api.signup(userProps).then(data => {
        successRegistrationHandler()
    })
    .catch((error) => {
        throw new SubmissionError({_error: 'Registration Failed'})
    })
}

/*
export const login = (email, password) => (dispatch) => {
    api.login(email, password).then(res => {
        if (res.sessionkey) {
            dispatch(actions.required2fa(res.sessionkey));
        } else {
            dispatch(actions.loginSuccess(res));
        }
    }).catch(e => {
        dispatch(actions.loginError(e));
    });
};
*/
