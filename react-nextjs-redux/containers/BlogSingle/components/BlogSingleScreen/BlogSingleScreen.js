import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import applyStyles from 'next-style-loader/applyStyles';
import cx from 'classnames';
import moment from 'moment';
import style from './style.scss';
import config from '../../../../config';

import Meta from '../../../../component/Meta';
import Intercom from '../../../../component/Intercom';
import BlogCategoryNavigation from '../../../../component/BlogCategoryNavigation';
import Map from '../../../../component/Map';
import ResourceList from '../../../../component/ResourceList';

const { translations } = config;

const BlogSingleScreen = ({
    post: {
        title,
        featured_image,
        date,
        categories,
        sponsor,
        content,
        location,
        seo,
    },
}) => (
    <div className={style.article} style={{ opacity: 0 }}>
        <Meta
            title={seo && seo.title ? seo.title : `${title || ''} - ${translations.title}`}
            description={seo.metadesc || null}
            opengraphType="article"
            opengraphTitle={seo.opengraphTitle || null}
            opengraphDescription={seo.opengraphDescription || null}
            opengraphImage={seo.opengraphImage || null}
            twitterTitle={seo.twitterTitle || null}
            twitterDescription={seo.twitterDescription || null}
            twitterImage={seo.twitterImage || null}
        />
        <Intercom customClasses={{ container: style.intercom }} />
        {/*<BlogCategoryNavigation />*/}
        <div className={style.titleWrap}>
            <div className="col-xs-12 col-md-10">
		            <h1 className={style.title} dangerouslySetInnerHTML={{ __html: title || '' }} />
            </div>
        </div>
		    <main role="main">
            <div className="wrap nooverflow">
		            <div className="container-fluid-md">
                    <div className="row">
                        <div className={cx(style.main, 'col-xs-12 col-md-8')}>
                            <div className={style.inner}>
		                            <div className={style.meta}>
				                            <span className={style.date}>{moment(date).format('MMM YYYY')}</span>
				                            {categories && (
						                            <span className={style.category} dangerouslySetInnerHTML={{ __html: categories[0].label }} />
				                            )}
				                            {sponsor && (
						                            <div className={style.sponsor}>
								                            {sponsor.thumbnail && (
										                            <span
												                            className={style.sponsorThumbnail}
												                            style={{ backgroundImage: `url(${sponsor.thumbnail}` }}
										                            />
								                            )}
								                            <Link href={sponsor.url}>
										                            <a target="_blank" rel="noopener noreferrer">
												                            <span className={style.sponsorName}>Sponsored by <span>{sponsor.name}</span></span>
												                            {sponsor.message && <span className={style.sponsorMessage}>{sponsor.message}</span>}
										                            </a>
								                            </Link>
						                            </div>
				                            )}
		                            </div>

		                            <div
				                            className={style.image}
				                            style={{
						                            backgroundImage: featured_image && featured_image.sizes
								                            ? featured_image.sizes.blog_single_featured
										                            ? `url(${featured_image.sizes.blog_single_featured.url})`
										                            : `url(${featured_image.url})`
								                            : null,
				                            }}
		                            />

                                <div className={style.content} dangerouslySetInnerHTML={{ __html: content }} />
                            </div>
                        </div>
		                    <div className="col-xs-12 col-md-4">
				                    <div className={style.sidebar}>
						                    <ResourceList isSmall={true} color={'dark'} />
				                    </div>
		                    </div>
                    </div>
				            <div className="row">
						            {location && (
								            <div className={cx(style.sidebar, 'col-xs-12 col-md-8')}>
										            <div className={style.mapContainer}>
												            <Map
														            center={{ lat: parseFloat(location.lat), lng: parseFloat(location.lng) }}
														            markers={[{ id: '1', position: { lat: parseFloat(location.lat), lng: parseFloat(location.lng) } }]}
														            selectedMarkerId={'1'}
														            zoomControl={true}
														            defaultZoom={10}
														            renderInfoBox={() => (
																            <div className={style.pin} />
														            )}
												            />
										            </div>
								            </div>
						            )}
				            </div>
                </div>
            </div>
        </main>
    </div>
);

BlogSingleScreen.propTypes = {
    post: PropTypes.shape({
        post: PropTypes.object.isRequired,
    }),
};

BlogSingleScreen.defaultProps = {
    BlogSingleScreen: {},
};

export default applyStyles(style)(BlogSingleScreen);
