// Persist blog data to url

import Router from 'next/router';
import qs from 'qs';
import * as blogConstants from './constants';

let updateTimer;
let updates = {};

export default () => next => (action) => {
    next(action);

    // Only perform on client
    if (typeof window === 'undefined') {
        return;
    }

    if ([
        blogConstants.SET_ACTIVE_CATEGORY_ID,
        blogConstants.SET_ACTIVE_POST_PAGE].includes(action.type)
    ) {
        // Apply updates
        switch (action.type) {
            case blogConstants.SET_ACTIVE_CATEGORY_ID:
                updates = {
                    ...updates,
                    category: action.payload.id,
                };
                break;
            default:
                updates = {
                    ...updates,
                    ...action.payload,
                };
        }

        // Persist data to url (debounced)
        clearTimeout(updateTimer);
        updateTimer = setTimeout(() => {
            // Get current url
            const queryData = qs.parse(window.location.search.replace('?', ''));

            // Merge updates
            const newQueryData = {
                ...queryData,
                ...updates,
            };

            // Set url
            const newUrl = `/blog?${qs.stringify(newQueryData)}`;
            Router.push(newUrl, newUrl, { shallow: true });
        }, 300);
    }
};

