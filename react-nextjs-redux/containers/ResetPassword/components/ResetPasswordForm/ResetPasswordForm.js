import React from 'react';
import PropTypes from 'prop-types';
import applyStyles from 'next-style-loader/applyStyles';
import style from './style.scss';
import config from '../../../../config';

import Meta from '../../../../component/Meta';
import AutoForm from '../../../../component/AutoForm';
import Button from '../../../../component/Buttons';

const { translations } = config;

const ResetPasswordForm = ({
    status,
    handleSubmit,
    handleResend,
}) => (
    <div>
        <Meta title={`Reset Password - ${translations.title}`} />
        <h2>Reset your password</h2>
        {!['SUCCESS', 'FAIL'].includes(status) && (
            <AutoForm
                id="reset-password"
                onSubmit={handleSubmit}
                schema={[{
                    id: 'newPassword',
                    field: 'Input',
                    placeholder: 'New Password',
                    type: 'password',
                }]}
                customClasses={{ recaptcha: style.recaptcha }}
                recaptcha
            />
        )}
        {status === 'FAIL' && (
            <p className={style.status}>
                Your token seems to have expired.
                <a onClick={handleResend} className={style.link}>Request a new email?</a>
            </p>
        )}
        {status === 'SUCCESS' && (
            <p className={style.status}>Your password has been successfully reset</p>
        )}
    </div>
);

ResetPasswordForm.propTypes = {
    status: PropTypes.string,
    handleSubmit: PropTypes.func.isRequired,
    handleResend: PropTypes.func.isRequired,
};

export default applyStyles(style)(ResetPasswordForm);
