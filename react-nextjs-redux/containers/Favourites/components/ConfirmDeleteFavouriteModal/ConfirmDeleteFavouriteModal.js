import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import ActivityIndicator from '../../../../component/ActivityIndicator';
import styles from './styles';
import LargeButton from "../../../../component/Buttons/LargeButton";
import cx from 'classnames';
import SVG from '../../../../component/SVG';


const ConfirmDeleteFavouriteModal = ({ isLoading, classes, handleCloseClick, handleConfirmModal }) => (
    <div className={classes.modalPaddings}>
        <div className={classes.confirmMessage}>
            <h3 className={classes.confirmation}>Are you sure you want to remove this property from your list?</h3>
        </div>
        <div className={classes.btnContainer}>
            {(isLoading) && (<ActivityIndicator />)}
            <LargeButton white className={cx(classes.cancelBtn)} onClick={handleCloseClick }>
                <SVG icon={'cross'} className={cx(`icon cross small inline`)} />
                Cancel
            </LargeButton>
            <LargeButton dark onClick={handleConfirmModal} className={cx(classes.confirm)}>
                <SVG icon={'tick'} className={cx('icon tick small inline')} />
                Confirm
            </LargeButton>
        </div>
    </div>
);


ConfirmDeleteFavouriteModal.propTypes = {
    classes: PropTypes.shape({}).isRequired,
    handleCloseClick: PropTypes.func.isRequired,
    handleConfirmModal: PropTypes.func.isRequired,
};

export default injectSheet(styles)(ConfirmDeleteFavouriteModal);
