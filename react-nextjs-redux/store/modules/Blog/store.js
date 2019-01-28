import { combineReducers } from 'redux';

import {
    GET_POST,
    FETCH_POSTS,
    SET_ACTIVE_POST_SLUG,
    SET_ACTIVE_POST_PAGE,
    FETCH_CATEGORIES,
    SET_ACTIVE_CATEGORY_ID,
    SET_SEARCH_VALUE,
} from './constants';

import {
    getPost,
    fetchPosts,
    setActivePostSlug,
    setActivePostPage,
    fetchCategories,
    setActiveCategoryId,
    setSearchValue,
} from './reducers';

const defaultState = {
    entities: [],
    categories: [],
    activePostPage: 1,
    activePostSlug: null,
    activeCategoryId: null,
    totalPages: 0,
    fetchStatus: null,
    searchValue: '',
};

// Create named reducer to
// duplicate logic
const createPostReducer = (postType) => {
    return (state = defaultState, action) => {
        if (action.postType !== postType) {
            return state;
        }

        switch (action.type) {
            case GET_POST:
                return getPost(state, action);
            case FETCH_POSTS:
                return fetchPosts(state, action);
            case FETCH_CATEGORIES:
                return fetchCategories(state, action);
            case SET_ACTIVE_POST_SLUG:
                return setActivePostSlug(state, action);
            case SET_ACTIVE_POST_PAGE:
                return setActivePostPage(state, action);
            case SET_ACTIVE_CATEGORY_ID:
                return setActiveCategoryId(state, action);
            case SET_SEARCH_VALUE:
                return setSearchValue(state, action);
            default:
                return state;
        }
    };
};

export default combineReducers({
    posts: createPostReducer('posts'),
    resources: createPostReducer('resources'),
});
