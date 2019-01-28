import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { Link } from 'react-router-dom';
import { reduxForm, Field } from 'redux-form';
import { login, loginSuccess, loginRequest } from '../../actions/users';
import { REQUIRED } from '../../constants/errors';
import localize from '../../utils/localize-util';


class Login extends React.Component {

	componentDidMount() {
		this.props.loginRequest();
		this.props.reset();
	}

	renderField = ({input, label, type }) => {
		return (
			<div className={'input-group'}>
				<input autoComplete="of" {...input} type={type} className='form-control' placeholder={label}/>
			</div>
		)
	}

	render() {
		const { handleSubmit, login, translate, pristine, submitting, valid } = this.props;

		return (
			<div className='login-container'>
				<div className='auth-form' >
					<form onSubmit={handleSubmit(login)}>
						<div className='title'>
							<span>MediaMyne login</span>
						</div>
	          <div className='form-group'>
		          <Field name='username' type='text' component={this.renderField} label={translate('LABEL_LOGIN_USERNAME')} />
	          </div>
	          <div className='form-group' >
		          <Field name='password' type='password' component={this.renderField} label={translate('LABEL_LOGIN_PASSWORD')} />
	          </div>
						{this.props.user.loginError && (
							<div className='error'>
								<span>{translate('ALERT_WRONG_PASSWORD')}</span>
							</div>
						)}
	          <button type='submit' disabled={pristine || submitting || !valid} className='btn btn--primary btn--block btn--radius-0 btn--login-padding btn--text-white btn--default-600'>{translate('BTN_LOGIN')}</button>
	          <div className='auth-form__hint'>
	            <Link to={`/${localize.getLanguageCodeForUrl()}auth/forgot-password`}>{ translate('BTN_FORGOT_PASSWORD') }</Link>
	          </div>
					</form>
				</div>
			</div>
		)
	}
}


const select = (state) => ({
	user: state.user
});

export default compose(
	connect(select, { login, loginSuccess, loginRequest}),
	reduxForm({
		form: 'login',
		enableReinitialize: true,
		validate(values) {
			let errors = {};
			if (!values.username) errors.username = REQUIRED;
			if (!values.password) errors.mobile_number = REQUIRED;
			return errors; }
	}))(Login);
