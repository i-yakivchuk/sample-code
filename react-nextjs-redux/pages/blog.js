import React from 'react';
import connectStore from '../store/connectStore';
import Root from '../containers/Root';
import Header from '../component/Header';
import Footer from '../component/Footer';
import Blog from '../containers/Blog/components/BlogScreen';
import { actions as blogActions } from '../store/modules/Blog';
import promiseReturner from '../store/utils/promiseReturner';


const BlogPage = props => (
    <Root>
        <Header />
        <Blog {...props} />
        <Footer />
    </Root>
);

// Load initial properties on server
BlogPage.getInitialProps = async ({ isServer, store, req }) => {
    const page = parseInt(req && req.query.page) || 1;
    const category = parseInt(req && req.query.category);

    const postAction = promiseReturner(blogActions.fetchPosts)('posts', { limit: 5, page, category });
    const categoriesAction = promiseReturner(blogActions.fetchCategories)('posts');
    const resourcesAction = promiseReturner(blogActions.fetchPosts)('resources', { limit: 3, page: 1 });

    // On initial render set some state
    if (isServer) {
        store.dispatch(blogActions.setActivePostPage('posts', { page }));
        store.dispatch(blogActions.setActiveCategoryId('posts', { id: category }));
    }

    // Get posts and categories
    try {
        await Promise.all([
            store.dispatch(postAction),
            store.dispatch(categoriesAction),
            store.dispatch(resourcesAction),
        ]);
    } catch (e) {
        console.log('blog load error');
        console.log(e)
    }
};

export default connectStore(BlogPage);
