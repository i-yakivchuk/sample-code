import React from 'react';
import cx from 'classnames';
import Link from 'next/link';
import applyStyles from 'next-style-loader/applyStyles';
import PropTypes from 'prop-types';
import style from './style.scss';

const LinkWrapper = ({
    href,
    as,
    target,
    rel,
    children,
    onClick,
    customClasses,
}) => (
    <div onClick={onClick} className={customClasses.link} style={{ cursor: 'pointer' }}>
        <Link href={href} as={as}><a className={cx(customClasses.anchor || style.anchor, 'animator')} target={target} rel={rel}>
            {children}
        </a></Link>
    </div>
);

LinkWrapper.propTypes = {
    href: PropTypes.string.isRequired,
    as: PropTypes.string,
    target: PropTypes.string,
    rel: PropTypes.string,
    children: PropTypes.any,
    onClick: PropTypes.func.isRequired,
    customClasses: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
};

LinkWrapper.defaultProps = {
    customClasses: {},
};

export default applyStyles(style)(LinkWrapper);
