
export interface tokenMember {
    token: string
}

interface authProps {
    user: tokenMember
}

export interface storeState {
    auth: authProps,
    form: any
}

export interface AuthFormsReduxSelectors {
    isValid: any,
    submitFailed?: any
}

export interface LoginFieldsFirstStage {
    email: string,
    password: string
}

export interface LoginFieldsSecondStage {
    sms_code: string
}

export interface SignUpFormFields {
    first_name: string,
    last_name: string,
    email: string,
    mobile_number: string,
    password: string,
    password_confirm: string
}

export type SuccessRegistrationMessage = {title: string, userEmail: string, message: string[] | string};
export type SuccessRegistrationMessageAsProp = {successRegistrationMessage: SuccessRegistrationMessage}