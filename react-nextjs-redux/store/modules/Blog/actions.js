import {
    GET_POST,
    FETCH_POSTS,
    FETCH_CATEGORIES,
    SET_ACTIVE_POST_SLUG,
    SET_ACTIVE_POST_PAGE,
    SET_ACTIVE_CATEGORY_ID,
    SET_SEARCH_VALUE,
} from './constants';

import * as blogService from './service';

export const getPost = (postType, { slug }) => ({
    type: GET_POST,
    promise: () => blogService.getPost(postType, { slug }),
    payload: { slug },
    postType,
});

export const fetchPosts = (postType, { page, limit, categories, search }) => ({
    type: FETCH_POSTS,
    promise: () => blogService.fetchPosts(postType, { page, limit, categories, search }),
    payload: { page, limit, categories, search },
    postType,
});

export const fetchCategories = postType => ({
    type: FETCH_CATEGORIES,
    promise: blogService.fetchCategories,
    postType,
});

export const setActivePostSlug = (postType, { slug }) => ({
    type: SET_ACTIVE_POST_SLUG,
    payload: { slug },
    postType,
});

export const setActivePostPage = (postType, { page }) => ({
    type: SET_ACTIVE_POST_PAGE,
    payload: { page },
    postType,
});

export const setActiveCategoryId = (postType, { id }) => ({
    type: SET_ACTIVE_CATEGORY_ID,
    payload: { id },
    postType,
});

export const setSearchValue = (postType, { search }) => ({
    type: SET_SEARCH_VALUE,
    payload: { search },
    postType,
});
