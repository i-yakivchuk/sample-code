import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import cx from 'classnames';
import { Scrollbars } from 'react-custom-scrollbars';
import formSchema from './formSchema';
import AutoForm from '../../../../component/AutoForm';
import LargeButton from '../../../../component/Buttons';
import SVG from '../../../../component/SVG';
import ActivityIndicator from '../../../../component/ActivityIndicator';
import styles from './styles';
import style from '../FavouritesScreen/style.scss';


const AddPropertyModal = ({
    classes,
    wishlists,
    onWishlistClick,
    isLoading,
    isCreateListActive,
    setCreateListActive,
    handleCreateListSubmit,
    handleCloseClick,
    createError,
}) => (
    <div className={classes.container}>
        {(isLoading) && (<ActivityIndicator />)}
        <span className={cx('h3', classes.title)}>Save to Wish List</span>
        <span>
            {isCreateListActive ? (
                <div className={cx((createError ? classes.formError : ''))}>
                    {createError ? <span className={classes.error}>This field is required.</span> : null }
                    <AutoForm
                        id="create-favourites-list"
                        schema={formSchema}
                        onSubmit={handleCreateListSubmit}
                        renderButtons={(reset, remove) => (
                            <div className={classes.buttons}>
                                <LargeButton mahogany className={cx(classes.button)} type="button" onClick={() => { setCreateListActive(false) }}>
                                    <SVG icon={'cross'} className={cx(`icon cross small inline`)} />
                                    Cancel
                                </LargeButton>
                                <LargeButton dark className={classes.button} type="submit">
                                    <SVG icon={'tick'} className={cx('icon tick small inline')} />
                                    Create
                                </LargeButton>
                            </div>
                        )}
                    />
                </div>
            ) : (
                <a style={{color:'#008B8B'}}  className={classes.createLink} onClick={() => { setCreateListActive(true) }}>Create New Wish List</a>
            )}
        </span>
        <Scrollbars style={{ height: 'calc(100vh - 280px)' }} autoHide={false}>
            <ul className={classes.options}>
                {wishlists.map(({ id, title, hasSelectedPropertyId }) => (
                    <li key={id} className={classes.option}>
                        <button onClick={() => onWishlistClick(id, hasSelectedPropertyId)  } className={classes.wishlistButton}>
                            <span className={classes.optionTitle}>{title}</span>
                            <SVG icon={hasSelectedPropertyId ? 'heartfill' : 'heart' } className={cx(classes.optionIcon, 'icon heart small', { [classes.optionIconFill]: hasSelectedPropertyId })} />
                        </button>
                    </li>
                ))}
            </ul>
        </Scrollbars>
        <div className={classes.closeButtonContainer}>
            <LargeButton mahogany className={classes.closeButton} onClick={handleCloseClick} type="button">
                <SVG icon={'cross'} className={cx('icon cross small inline')} />
                Close
            </LargeButton>
        </div >
    </div>
);


AddPropertyModal.propTypes = {
    classes: PropTypes.shape({}).isRequired,
    wishlists: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    onWishlistClick: PropTypes.func.isRequired,
    isLoading: PropTypes.bool.isRequired,
    isCreateListActive: PropTypes.bool.isRequired,
    setCreateListActive: PropTypes.func.isRequired,
    handleCreateListSubmit: PropTypes.func.isRequired,
    handleCloseClick: PropTypes.func.isRequired,
};

export default injectSheet(styles)(AddPropertyModal);
