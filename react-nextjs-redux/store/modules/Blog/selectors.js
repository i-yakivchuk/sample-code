import { createSelector } from 'reselect';
import sanitize from 'sanitize-html';

// Selector Helpers
const allowedTags = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'blockquote', 'p', 'a', 'ul', 'ol',
'nl', 'li', 'b', 'i', 'em', 'strike', 'code', 'br', 'div', 'span',
'table', 'thead', 'caption', 'tbody', 'tr', 'th', 'td', 'pre', 'img' ];

const allowedAttributes = {
    a: ['href', 'name', 'target'],
    img: ['src', 'class'],
};

const normalizePost = post => ({
    ...post,
    title: post.title.rendered,
    content: sanitize(post.content.rendered, { allowedTags, allowedAttributes }),
    excerpt: post.excerpt && sanitize(post.excerpt.rendered, { allowedTags, allowedAttributes }),
});

// Selectors
const getAllPosts = state => state.blogStore.posts.entities;
const getAllResources = state => state.blogStore.resources.entities;
export const getCategories = state => state.blogStore.posts.categories;
export const getActiveCategoryId = state => state.blogStore.posts.activeCategoryId;
export const getActivePostSlug = state => state.blogStore.posts.activePostSlug;
export const getActivePostPage = state => state.blogStore.posts.activePostPage;
export const getTotalPages = state => state.blogStore.posts.totalPages;
export const getSearchValue = state => state.blogStore.posts.searchValue;
export const getFetchStatus = state => state.blogStore.posts.fetchStatus;

// Normalize posts
export const getPosts = createSelector([
    getAllPosts,
], posts => (
    posts.map(normalizePost)
));

export const getResources = createSelector([
    getAllResources,
], resources => (
    resources.map(normalizePost)
));

export const getActivePost = createSelector([
    getPosts, getActivePostSlug,
], (posts, activePostSlug) => (
    posts.find(({ slug }) => slug === activePostSlug)
));

export const getFilteredPosts = createSelector([
    getPosts, getActiveCategoryId, getSearchValue,
], (posts, activeCategoryId, searchValue) => {
    const testCategoryMatch = (categories) => {
        return !activeCategoryId
            || activeCategoryId === 'all'
            || categories.filter(category => ( category.id === activeCategoryId )).length > 0;
    };

    return posts.filter(({ slug, categories }) => (
        testCategoryMatch(categories) &&
        slug.includes(searchValue)
    ));
});
