import React from 'react';
import connectStore from '../store/connectStore';
import Root from '../containers/Root';
import Header from '../component/Header';
import Footer from '../component/Footer';
import Error from './_error';
import BlogSingle from '../containers/BlogSingle';
import { actions as blogActions, selectors as blogSelectors } from '../store/modules/Blog';
import { actions as propertiesActions } from '../store/modules/Properties';
import promiseReturner from '../store/utils/promiseReturner';

const BlogSinglePage = props => (
    props.statusCode === 404 ? (
        <Error />
    ) : (
        <Root>
            <Header />
            <BlogSingle {...props} />
            <Footer />
        </Root>
    )
);

BlogSinglePage.getInitialProps = async ({ store, req, res, query }) => {
    let statusCode = 200;
    const slug = (query && query.slug) || (req && req.params && req.params.slug);
    store.dispatch(blogActions.setActivePostSlug('posts', { slug }));

    // Check if active post is in store
    const activePost = blogSelectors.getActivePost(store.getState()) || {};

    // Get post if content has not been fetched
    if (!activePost.content) {
        const action = promiseReturner(blogActions.getPost)('posts', { slug });
        const categoriesAction = promiseReturner(blogActions.fetchCategories)('posts');
		    const resourcesAction = promiseReturner(blogActions.fetchPosts)('resources', { limit: 3, page: 1 });

        try {
            const blog = await Promise.all([
                store.dispatch(action),
                store.dispatch(categoriesAction),
		            store.dispatch(resourcesAction),
            ]);

            // Have to check payload instead of status code due to WP
            if (blog[0].payload.length) {
                const { location } = blog[0].payload[0];
                // TODO Related properties
            } else {
                statusCode = 404;
            }
        } catch (e) {
            if (res) {
                res.statusCode = statusCode = 404;
            }
        }
    }

    return { statusCode };
};

export default connectStore(BlogSinglePage);
