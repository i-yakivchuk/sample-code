import { connect } from 'react-redux';
import { isValid, hasSubmitFailed } from 'redux-form';
import { storeState } from '../../types/index';
import SignUp from './SignUp';
import { SIGN_UP_FORM } from './constants';


const mapStateToProps = (state: storeState) => {

    return {
        submitFailed: hasSubmitFailed(SIGN_UP_FORM)(state),
        isValid: isValid(SIGN_UP_FORM)(state),
    }
}

const mapDispatchToProps = (dispatch: (...args: any[]) => void) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
