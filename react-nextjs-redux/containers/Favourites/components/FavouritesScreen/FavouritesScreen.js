import React from 'react';
import applyStyles from 'next-style-loader/applyStyles';
import PropTypes from 'prop-types';
import cx from 'classnames';
import config from '../../../../config';
import style from './style.scss';
import formSchema from './formSchema';
import Meta from '../../../../component/Meta';
import SVG from '../../../../component/SVG';
import AutoForm from "../../../../component/AutoForm";
import Button from "../../../../component/Buttons";
import FavouriteCard from '../FavouriteCard';
import PaginatedList from '../../../../component/PaginatedList';

const { translations } = config;


const FavouritesScreen = ({ lists, createError, handleCreateListSubmit, isCreateListActive, setCreateListActive }) => (
    <div className={style.wrapper}>
        <Meta
            title={`Favourites - ${translations.title}`} key="title"
            description="Placeholder description for favourites here"
        />
        <div className="wrap nooverflow">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-xs-12">
                        <div className={style.header}>
                            <h1 className={style.title}>Favourites Lists</h1>
		                        {isCreateListActive ? (
				                        <div className={cx(style.headerForm, (createError ? style.formError : ''))}>
                                    {createError ? <span className={style.error}>This field is required.</span> : null }
						                        <AutoForm
								                        id="create-favourites-list"
								                        schema={formSchema}
								                        onSubmit={handleCreateListSubmit}
								                        renderButtons={(reset, remove) => (
										                        <div className={style.buttons}>
												                        <Button style={{ marginRight: 10 }} mahogany type="button" onClick={() => { setCreateListActive(false) }}>
														                        <SVG icon={'cross'} className={cx(`icon cross small inline`)} />
														                        Cancel
												                        </Button>
												                        <Button dark  type="submit">
														                        <SVG icon={'tick'} className={cx('icon tick small inline')} />
														                        Create
												                        </Button>
										                        </div>
								                        )}
						                        />
				                        </div>
		                        ) : (
				                        <Button dark  type="button" onClick={() => { setCreateListActive(true) }}>
						                        <SVG icon={'circleplus'} className={cx(style.icon)} />
						                        Add new board
				                        </Button>
		                        )}
                        </div>
                    </div>
                </div>
                <div className="row" style={{ justifyContent: 'center' }}>
		                { lists.length
				                ? (<div style={{ width: '100%' }}>
						                <PaginatedList
								                className={style.list}
								                items={lists}
								                page={1}
								                pageSize={50}
								                renderItem={({ id, title, slug, media, properties }) => (
										                <FavouriteCard key={id} id={id} title={title} slug={slug} media={media} count={properties} />
								                )}
						                />
                            {/* //<FavouritesPagination /> */}
				                </div>)
				                : (<div className={style.emptyContent}>
						                <SVG icon={'heartfill'} className={cx(style.emptyIcon, 'inline')} />
						                <span className={style.emptyText}>Your favourites is empty</span>
						                <span className={style.emptyText}>Please create your first board!</span>
				                </div>)
		                }
                </div>
            </div>
        </div>
    </div>
);

FavouritesScreen.propTypes = {
    lists: PropTypes.array.isRequired,
		setCreateListActive: PropTypes.func.isRequired,
		isCreateListActive: PropTypes.bool.isRequired,
    handleCreateList: PropTypes.func.isRequired,
};

export default applyStyles(style)(FavouritesScreen);
