import qs from 'qs';
import config from '../config';

require('isomorphic-fetch');

// Wrap fetch to reject on http errors
const enhancedFetch = (url, options = {}) => {
    const apiUrl = config.environment.apiUrl;
    const baseUrl = url.startsWith('http')
        ? url
        : process.browser ? url : `${apiUrl}${url}`;

    // Stringify body
    const body = options.body && typeof options.body === 'object'
        ? JSON.stringify(options.body)
        : options.body;

    // Process query string
    const query = options.qs ? qs.stringify(options.qs) : '';

    const fullUrl = baseUrl + (query ? `?${query}` : '');
    return fetch(fullUrl, {
        headers: new Headers({
            'Content-Type': 'application/json',
        }),
        method: 'GET',
        ...options,
        credentials: 'same-origin',
        body,
    }).then((response) => {
        return response.json().then((json) => {
            // Format response to normalise
            const formattedResponse = json.payload ? json : { payload: json };

            const responsePayload = {
                ...formattedResponse,
                headers: response.headers._headers,
            };

            return response.ok ? responsePayload : Promise.reject(json);
        });
    });
};

export default enhancedFetch;
