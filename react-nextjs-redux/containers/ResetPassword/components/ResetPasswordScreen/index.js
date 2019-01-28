import { connect } from 'react-redux';
import { selectors as authSelectors } from '../../../../store/modules/Auth';
import ResetPasswordScreen from './ResetPasswordScreen';

const mapStateToProps = state => ({
    formId: authSelectors.getActiveResetPasswordForm(state),
});

export default connect(mapStateToProps)(ResetPasswordScreen);
