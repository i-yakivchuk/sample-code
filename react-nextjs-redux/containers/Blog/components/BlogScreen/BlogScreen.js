import React from 'react';
import applyStyles from 'next-style-loader/applyStyles';
import cx from 'classnames';
import BlogHero from '../BlogHero';
import BlogPosts from '../BlogPosts';
import BlogFooter from '../BlogFooter';
import BlogPagination from '../BlogPagination';
import BlogSearch from '../BlogSearch';
import style from './style.scss';
import config from '../../../../config';

import Meta from '../../../../component/Meta';
import BlogCategoryNavigation from '../../../../component/BlogCategoryNavigation';
import ResourceList from '../../../../component/ResourceList';
import ActivityIndicator from '../../../../component/ActivityIndicator';
import Quote from '../../../../component/Quote';

const { translations } = config;

const BlogScreen = ({
    fetchStatus,
}) => (
    <div className={style.blog} style={{ opacity: 0 }}>
        <Meta
            title={`The Student Life Inspiration, tips and a bucket load of exam procrastination - ${translations.title}`}
        />
        <BlogHero />
        <BlogCategoryNavigation />
        <div className={cx(style.columns, 'wrap')}>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-xs-12">
		                    <div>
				                    <div className={style.mainTopSearch}>
						                    <BlogSearch />
				                    </div>
		                    </div>
                    </div>
                    <div className="col-xs-12 col-md-8">
                        <div className={style.main}>
                            {fetchStatus === 'PENDING' && (
                                <div className={style.loading}>
                                    <ActivityIndicator
                                        size="large"
                                        customClasses={{ indicator: style.indicator }}
                                    />
                                </div>
                            )}
                            <BlogPosts />
                            <div className={style.mainSearch}>
                                <BlogSearch />
                            </div>
                            <BlogPagination />
                        </div>
                    </div>
                    <div className="col-xs-12 col-md-4">
                        <div className={style.sidebar}>
                            <ResourceList color="dark" isSmall={true} />
                            {/* <div className={style.ambassador}>
                                <span className={style.title}>Become a Cribs Student <span>Brand Ambassador</span></span>
                                <LargeButton white>
                                    <Link href="/" prefetch>
                                        <a>Learn More</a>
                                    </Link>
                                </LargeButton>
                            </div>*/}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <BlogFooter />
    </div>
);

export default applyStyles(style)(BlogScreen);
