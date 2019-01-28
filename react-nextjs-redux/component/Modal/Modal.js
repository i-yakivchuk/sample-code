import React from 'react';
import PropTypes from 'prop-types';
import Portal from 'react-portal';
import cx from 'classnames';
import applyStyles from 'next-style-loader/applyStyles';
import style from './style.scss';

const Modal = ({
    children,
    isOpened,
    openModal,
    closeModal,
    handleOpen,
    handleClose,
    customClasses,
}) => (
    <Portal
        isOpened={isOpened}
        closeOnEsc
        onOpen={() => openModal(handleOpen)}
        onClose={() => closeModal(handleClose)}
    >
        <div className={cx(style.modalContainer, customClasses.modalContainer)}>
            <div className={cx(style.dialog, customClasses.dialog)}>
                {children}
            </div>
        </div>
    </Portal>
);

Modal.propTypes = {
    children: PropTypes.any,
    isOpened: PropTypes.bool,
    openModal: PropTypes.func.isRequired,
    closeModal: PropTypes.func.isRequired,
    handleOpen: PropTypes.func,
    handleClose: PropTypes.func,
    customClasses: PropTypes.shape({}),
};

Modal.defaultProps = {
    customClasses: {},
    isOpened: false,
};

export default applyStyles(style)(Modal);
