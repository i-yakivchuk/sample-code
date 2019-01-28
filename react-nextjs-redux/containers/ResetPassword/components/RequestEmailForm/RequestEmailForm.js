import React from 'react';
import PropTypes from 'prop-types';
import applyStyles from 'next-style-loader/applyStyles';
import style from './style.scss';
import config from '../../../../config';

import Meta from '../../../../component/Meta';
import AutoForm from '../../../../component/AutoForm';
import { LargeButton } from '../../../../component/AutoForm';
import SVG from '../../../../component/SVG';

const { translations } = config;

const RequestEmailForm = ({
    status,
    handleSubmit,
}) => (
    <div>
        <Meta title={`Request a new password - ${translations.title}`} />
        <h2>Request a new password</h2>
        {!['SUCCESS', 'FAIL'].includes(status) && (
            <AutoForm
                id="request-password"
                onSubmit={handleSubmit}
                schema={[{
                    id: 'email',
                    field: 'Input',
                    placeholder: 'Email Address',
                }]}
                status={status}
                customClasses={{ recaptcha: style.recaptcha }}
                recaptcha
            />
        )}
        {status === 'FAIL' && (
            <p className={style.status}>
                <SVG icon="facesad" className="icon facesad small inline" />
                There was an error sorry
            </p>
        )}
        {status === 'SUCCESS' && (
            <p className={style.status}>
                <SVG icon="facehappy" className="icon facehappy small inline" />
                Please check you email, and junk mail for a reset link
            </p>
        )}
    </div>
);

RequestEmailForm.propTypes = {
    status: PropTypes.string,
    handleSubmit: PropTypes.func.isRequired,
};

export default applyStyles(style)(RequestEmailForm);
