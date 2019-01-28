import * as React from "react";
import { reduxForm, InjectedFormProps, Field } from "redux-form";
import { SIGN_UP_FORM } from "../../constants";
import { renderInput } from '../../../../components';
import { LOGIN } from '../../../../constants/routes';
import { formsSyncValidator } from './validator';
import { AuthFormsReduxSelectors, SignUpFormFields, SuccessRegistrationMessage } from '../../../../types';
import { signUp } from '../../../../store/moduls/auth/operations';
import { Redirect } from 'react-router-dom';


interface SignUpFormPropsState {
    successRegistrationSubmit: boolean,
    successRegistrationMessage: SuccessRegistrationMessage
}

type SignUpFormProps = InjectedFormProps<SignUpFormFields> & AuthFormsReduxSelectors;
class SignUpForm extends React.Component<SignUpFormProps, SignUpFormPropsState> {

    state = {
        successRegistrationSubmit: false,
        successRegistrationMessage: {
            title: 'Thank You for Registering',
            userEmail: '',
            message: ['We have sent the confirmation email to ', '. Please check your email and click on the link to verify your email address.']
        }
    }

    successRegistrationHandler = (values: SignUpFormFields) => () => {
        const { email } = values;
        const message = this.state.successRegistrationMessage.message.join(email);

        this.setState({
            ...this.state,
            successRegistrationMessage: {
                ...this.state.successRegistrationMessage,
                userEmail: email,
                message
            },
            successRegistrationSubmit: true
        });
    }
    
    submit = (values: SignUpFormFields) => {
        const handler = this.successRegistrationHandler(values);
        return signUp(values, handler)()
    }

    render() {
        const { pristine, submitting, error, isValid } = this.props;
        
        if (this.state.successRegistrationSubmit) {
            return <Redirect to={{pathname: LOGIN, state: this.state.successRegistrationMessage}} />
        } else {
            return (
                <div className="row">
                    <div className="col-12 bg-white" id="form-container">
                        <div className="col-12 text-center pt-5 pb-1 form-title">
                            Register
                        </div>
                        <div className="col-9 pb-5" id="login-service-info">
                            Titus Global can only be connected to the services authorized by Titus
                        </div>
                        <div className="col-12 pb-3 px-4">
                            <form onSubmit={ this.props.handleSubmit(this.submit) }>
                                <div className="form-group pb-2">
                                    <Field
                                        name="first_name"
                                        class="form-control input-right-border-radius"
                                        icon="fas fa-user"
                                        component={renderInput}
                                        type="text"
                                        placeholder="First Name"
                                    />
                                </div>
                                <div className="form-group pb-2">
                                    <Field
                                        name="last_name"
                                        class="form-control input-right-border-radius"
                                        component={renderInput}
                                        icon="fas fa-user"
                                        type="text"
                                        placeholder="Last Name"
                                    />
                                </div>
                                <div className="form-group pb-2">
                                    <Field
                                        name="email"
                                        class="form-control input-right-border-radius"
                                        component={renderInput}
                                        icon="fas fa-at"
                                        type="text"
                                        placeholder="Email"
                                    />
                                </div>
                                <div className="form-group pb-2">
                                    <Field
                                        name="mobile_number"
                                        class="form-control input-right-border-radius"
                                        component={renderInput}
                                        icon="fas fa-mobile-alt"
                                        type="text"
                                        placeholder="Phone"
                                    />
                                </div>
                                <div className="form-group pb-2">
                                    <Field
                                        name="password"
                                        class="form-control input-right-border-radius"
                                        component={renderInput}
                                        icon="fas fa-lock"
                                        type="password"
                                        placeholder="Password"
                                    />
                                </div>
                                <div className="form-group pb-2">
                                    <Field
                                        name="password_confirm"
                                        class="form-control input-right-border-radius"
                                        component={renderInput}
                                        icon="fas fa-lock"
                                        type="password"
                                        placeholder="Confirm Password"
                                    />
                                </div>
                                <div className="col-12 text-center pb-3 login-failed">
                                    {error && 
                                        <span><i className="fas fa-exclamation-circle"></i> <strong>{error}</strong></span>
                                    }
                                </div>
                                <div className="form-group text-center">
                                    <button className="btn btn-row px-4" id="login-btn" type="submit" disabled={!isValid || pristine || submitting}>
                                        REGISTER
                                    </button>
                                </div>
                            </form>
                        </div>
                        <div className="col-12 text-center text-black pb-3" id="account-options">
                            <span>Already have an account?</span><br/>
                            <span><a href={LOGIN}>Log in</a></span><br/>
                        </div>
                    </div>
                </div>
            )
        }
    }
}

export default reduxForm<SignUpFormFields, any>({
    form: SIGN_UP_FORM,
    validate: formsSyncValidator
})(SignUpForm);