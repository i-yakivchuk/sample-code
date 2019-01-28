import React from 'react';
import PropTypes from 'prop-types';
import applyStyles from 'next-style-loader/applyStyles';
import style from './style.scss';
import ResetPasswordForm from '../ResetPasswordForm';
import RequestEmailForm from '../RequestEmailForm';
import config from '../../../../config';

import Meta from '../../../../component/Meta';

const { translations } = config;

const ResetPasswordScreen = ({
    formId,
}) => (
    <div className={style.resetPassword}>
        <Meta title={`Reset Password - ${translations.title}`} />
        <div className="wrap">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-xs-12 col-sm-10 col-sm-offset-1 col-md-8 col-md-offset-2">
                        {formId === 'reset' ? (
                            <ResetPasswordForm />
                        ) : (
                            <RequestEmailForm />
                        )}
                    </div>
                </div>
            </div>
        </div>
    </div>
);

ResetPasswordScreen.propTypes = {
    formId: PropTypes.string,
};

export default applyStyles(style)(ResetPasswordScreen);
