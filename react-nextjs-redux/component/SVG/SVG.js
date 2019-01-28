import React from 'react';
import PropTypes from 'prop-types';
import ReactSVG from 'react-svg';

const SVG = ({
    icon, fill, className, style,
}) => (
    <ReactSVG
        path={`/static/svg/${icon}.svg`}
        style={{ fill, ...style }}
        className={className}
    />
);

SVG.propTypes = {
    icon: PropTypes.string.isRequired,
    fill: PropTypes.string,
    className: PropTypes.oneOfType([PropTypes.string, PropTypes.object, PropTypes.bool]),
    style: PropTypes.shape({}),
};

export default SVG;
