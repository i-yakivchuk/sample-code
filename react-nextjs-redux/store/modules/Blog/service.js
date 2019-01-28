import omit from 'object.omit';
import fetch from '../../../utils/fetch';
import config from '../../../config';

const blogUrl = config.environment.blogUrl;

export const getPost = (postType, { slug }) => {
    return fetch(`${blogUrl}/${postType}`, {
        qs: { slug },
    });
};

export const fetchPosts = (postType, { page = 1, limit = 5, categories, search }) => {
    let queryData = { page, per_page: limit, categories, search };

    // Remove categories key if set to 'all'
    if (categories === 'all' || !categories) {
        queryData = omit(queryData, 'categories');
    }

    return fetch(`${blogUrl}/${postType}`, {
        qs: queryData,
    }).then((res) => {
        const headers = res.headers || {};
        const totalPagesHeader = headers['x-wp-totalpages'] || [null];

        return {
            headers: res.headers,
            payload: {
                entities: res.payload,
                totalPages: parseInt(totalPagesHeader[0]),
            },
        };
    });
};

export const fetchCategories = () => {
    return fetch(`${blogUrl}/categories`).then((res) => {
        return {
            payload: {
                entities: res.payload,
            },
        };
    });
};
