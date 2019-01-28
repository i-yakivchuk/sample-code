import Axios from 'axios';
import Credentials from './credentials';
import CONFIG from '../config';


console.log(CONFIG.API_URL);

Axios.defaults.headers.post['Content-Type'] = 'application/json';
Axios.defaults.headers.post['Accept'] = 'application/json';

const Api = Axios.create();

// Add a request interceptor
Api.interceptors.request.use(function (config) {
  config.url = CONFIG.API_URL + config.url;
  config.headers = {...config.headers, ...Credentials.multiGet(config.credentials)};

  return config;
}, function (error) {
	return Promise.reject(error);
});

// Add a response interceptor
Api.interceptors.response.use(function (response) {
	return response;
}, function (error) {
    Credentials.error(error.response);
    return Promise.reject(error);
});

export default Api;