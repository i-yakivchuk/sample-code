import React from 'react';
import ReactLightbox from 'react-images';
import PropTypes from 'prop-types';
import applyStyles from 'next-style-loader/applyStyles';
import style from './style.scss';

const Lightbox = ({
    ...props,
    onPrevImage,
    onNextImage,
    onClickThumbnail,
    onClose,
    isOpen,
    currentImageIndex,
}) => (
    <ReactLightbox
        isOpen={isOpen}
        onClickPrev={onPrevImage}
        onClickNext={onNextImage}
        onClickThumbnail={onClickThumbnail}
        onClose={onClose}
        currentImage={currentImageIndex}
        showCloseButton
        backdropClosesModal
        showThumbnails
        {...props}
    />
);

Lightbox.propTypes = {
    onPrevImage: PropTypes.func.isRequired,
    onNextImage: PropTypes.func.isRequired,
    onClickThumbnail: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
    isOpen: PropTypes.bool.isRequired,
    currentImageIndex: PropTypes.number.isRequired,
};

Lightbox.defaultProps = {
    currentImageIndex: 0,
};

export default applyStyles(style)(Lightbox);
