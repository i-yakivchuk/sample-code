import { SignUpFormFields } from "../../../../types";

export const formsSyncValidator = (values: SignUpFormFields) => {
    type errors = {
        first_name?: string,
        last_name?: string,
        email?: string,
        mobile_number?: string,
        password?: string,
        password_confirm?: string
    }
    const errors: errors = {};
    const required = 'This field is required';
    const confirmError = 'Password does not match';

    if (!values.first_name) {
        errors.first_name = required
    }
    if (!values.last_name) {
        errors.last_name = required
    }
    if (!values.mobile_number) {
        errors.mobile_number = required
    }
    if (!values.password) {
        errors.password = required
    }
    if (!values.password_confirm) {
        errors.password_confirm = required
    }
    if (values.password_confirm && values.password !== values.password_confirm) {
        errors.password = confirmError;
        errors.password_confirm = confirmError;
    }
    if (!values.email) {
      errors.email = required
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
      errors.email = 'Invalid email address'
    }
    return errors
}