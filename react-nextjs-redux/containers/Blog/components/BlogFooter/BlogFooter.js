import React from 'react';
import applyStyles from 'next-style-loader/applyStyles';
import style from './style.scss';

import SocialNetworks from '../../../../component/SocialNetworks';

const BlogFooter = () => (
    <div>
        <div className={style.footer}>
            <img src="/static/svg/logo-red-white-resooma.svg" alt="Resooma" />

        </div>
        <SocialNetworks />
    </div>
);

export default applyStyles(style)(BlogFooter);
