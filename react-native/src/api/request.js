import config from '../../config';
import store from '../store/configureStore';
import { getCurrent } from '../selectors/users';
import { Alert } from 'react-native';
import RNFetchBlob from "react-native-fetch-blob";
const TIMEOUT_ERROR = 'timeout';


export const getUserToken = () => {
	const state = store.getState();
	const user = getCurrent(state);
	return user && user.token || "";
};

function getBaseOptions(method, isMedia) {
	const options = {};
	options.method = method;
	options.headers = {};
	options.headers['Accept'] = 'application/json';
	options.headers['Content-Type'] = isMedia ? 'multipart/form-data' : 'application/json';

	return options;
}

function authorizeRequest(options) {
	options.headers['Authorization'] = getUserToken();
	return options;
}

function getPathWithQueryString(path, params = {}) {
	const esc = encodeURIComponent;
	const query = Object.keys(params)
		.filter(k => params[k])
		.map(k => {
			if (Array.isArray(params[k]))
				return params[k]
					.map(val => `${encodeURIComponent(k)}[]=${encodeURIComponent(val)}`)
					.join('&');

			return esc(k) + '=' + esc(params[k]);
		}).join('&');

	return query ? path + '?' + query : path;
}

function getVersionendPath(path) {
	const { version } = config.api;
	return `/${version}/${path}`;
}

function getRequestUrl(path) {
	const { endpoint, port } = config.api;
	const versionedPath = getVersionendPath(path);

	if (port) {
		return `${endpoint}:${port}${versionedPath}`
	} else {
		return `${endpoint}${versionedPath}`
	}
}

function base(path, method, customOptions, isMedia = false) {
	let options =  getBaseOptions(method, isMedia);
	options = Object.assign(options, authorizeRequest(options), customOptions);

	return fetch(getRequestUrl(path), options)
		.then(async response => {

			if (response.status === 204) {
				return null;
			}

			if (response.status === 401) {
				const _resp = response.clone();
				const resp = await _resp.json();

				if (resp.sessionkey)
					return resp;
			}

			if (response.status >= 400 && response.status < 600) {
				throw response;
			}

			if (response.status === 204) {
				return {};
			} else {
				try {
					return await response.json();
				} catch (err) {
					return null;
				}
			}
		})
		.catch((err) => {
			if (err.message === TIMEOUT_ERROR || err.message === "Network request failed") {
				//store.dispatch(updateInternetState(false));
			} else if (err.status == 401) {
				//store.dispatch(logoutSuccess(null));
			}

			throw err;
		});
}

const request = {
	get: (path, params) => {
		const pathWithParams = getPathWithQueryString(path, params);
		return base(pathWithParams, 'GET', {});
	},
	delete: (path, params) => {
		const options = {body: JSON.stringify(params)};
		return base(path, 'DELETE', options);
	},
	post: (path, params) => {
		const options = {body: JSON.stringify(params)};
		return base(path, 'POST', options);
	},
	put: (path, params) => {
		const options = {body: JSON.stringify(params)};
		return base(path, 'PUT', options);
	},
	patch: (path, params) => {
		const options = {body: JSON.stringify(params)};
		return base(path, 'PATCH', options);
	},
	uploadFile: (path, params) => {
		let options = getBaseOptions('POST', true);
		options = Object.assign(options, authorizeRequest(options));
		return RNFetchBlob.fetch('POST', getRequestUrl(path), options.headers, params);
	}
};

export default request;
