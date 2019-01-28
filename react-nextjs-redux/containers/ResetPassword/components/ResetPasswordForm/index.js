import { connect } from 'react-redux';
import getQueryString from '../../../../utils/getQueryString';

import { actions as authActions, selectors as authSelectors } from '../../../../store/modules/Auth';
import ResetPasswordForm from './ResetPasswordForm';

const mapStateToProps = state => ({
    status: authSelectors.getResetPasswordStatus(state),
});

const mapDispatchToProps = dispatch => ({
    handleSubmit({ newPassword, recaptcha }) {
        if (!recaptcha || !newPassword) return;
        const { resetToken } = getQueryString();
        dispatch(authActions.resetPassword({ newPassword, recaptchaToken: recaptcha, resetToken }));
    },
    handleResend() {
        dispatch(authActions.setActiveResetPasswordForm({ formId: 'request' }));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(ResetPasswordForm);
