import { connect } from 'react-redux';
import { actions as authActions, selectors as authSelectors } from '../../../../store/modules/Auth';
import RequestEmailForm from './RequestEmailForm';

const mapStateToProps = state => ({
    status: authSelectors.getRequestPasswordStatus(state),
});

const mapDispatchToProps = dispatch => ({
    handleSubmit({ email, recaptcha }) {
        if (!recaptcha || !email) return;
        dispatch(authActions.requestPasswordReset({ email, recaptchaToken: recaptcha }));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(RequestEmailForm);
