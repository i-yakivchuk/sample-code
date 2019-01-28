/**
 * Created by ivan on 28.11.17.
 */
import React from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { compose } from 'recompose';
import classNames from  'classnames';
import { INVALID_EMAIL } from '../../constants/validations';
import { forgotPassword } from '../../actions/users';
import localize from '../../utils/localize-util';


class ForgotPassword extends React.Component {

	renderField = ({input, label, type, meta: {touched, error }}) => {
		return (
			<div>
				<div className='input-group'>
					<input {...input} type={type} className='form-control' placeholder={label}/>
				</div>
				<div className={classNames({'error': touched && error})}>{touched && (error && <span>{error}</span>)}</div>
			</div>
		)
	}

	onCancel() {
		this.props.history.push(`/${localize.getLanguageCodeForUrl()}auth/login`);
	}

	render() {
		const { handleSubmit, translate, pristine, submitting, valid} = this.props;

		return (
			<div>
				<div className='auth-form forgot-password'>
					<form onSubmit={handleSubmit(this.props.forgotPassword)}>
						<div className='title'>
							<span>Reset password</span>
						</div>
						<div className='sub-title'>
							<span>{ translate('ALERT_ENTEREMAIL') }</span>
						</div>
						<div className='form-group'>
							<Field name='email' type='text' component={this.renderField} label={translate('LABEL_EMAIL')} />
						</div>
						<div className='d-flex justify-content-between'>
							<button type='button' onClick={this.onCancel.bind(this)} className='btn btn--cancel btn--cancel--primary btn--block'>{ translate('BTN_CANCEL') }</button>
							<button type='submit' disabled={pristine || submitting || !valid} className='btn btn--send btn--send--primary btn--block'>{ translate('BTN_SEND') }</button>
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
	connect(select, {forgotPassword}),
	reduxForm({
		form: 'forgot-password',
		enableReinitialize: true,
		touchOnChange: true,
		validate(values) {
			return (values.email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,20}$/i.test(values.email)) ? { email: INVALID_EMAIL } : null;
		}
	}))(ForgotPassword);
