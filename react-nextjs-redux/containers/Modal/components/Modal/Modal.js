import React from 'react';
import ReactModal from 'react-aria-modal';
import applyStyles from 'next-style-loader/applyStyles';
import PropTypes from 'prop-types';
import style from './style.scss';

const Modal = ({
    isModalVisible,
    handleOpen,
    handleClose,
    Screen,
                   modalDisableOnOverlay,
}) => (
    <ReactModal
        titleId="global-modal"
        titleText="Global Modal"
        mounted={isModalVisible}
        onEnter={handleOpen}
        onExit={handleClose}
        underlayClickExits ={!!!modalDisableOnOverlay }
        includeDefaultStyles={false}
        underlayClass={style.underlay}
        dialogClass={style.dialog}
        verticallyCenter={false}
        focusDialog
    >
        <div className={style.container}>
        <div className={style.wrapClose}><span onClick={handleClose} className={style.close}>&times;</span></div>
            { Screen && <Screen /> }
        </div>
    </ReactModal>
);

Modal.propTypes = {
    isModalVisible: PropTypes.bool.isRequired,
    handleOpen: PropTypes.func.isRequired,
    handleClose: PropTypes.func.isRequired,
    Screen: PropTypes.func,
};

export default applyStyles(style)(Modal);
