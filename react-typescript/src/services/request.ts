import config from '../config/config';
import store from '../store';
const TIMEOUT_ERROR = 'timeout';


interface IRequestOptions {
    method?: string;
    body?: any;
    headers?: any;
}


class Request {

    private readonly api: any;

    constructor() {
        const api = config as any;
        this.api = api;
    }

    public delete = (path: string, params?: any) => {
        const options: IRequestOptions = { body: JSON.stringify(params) };
        return this.base(path, "DELETE", options);
    };

    public get = (path: string, params?: any) => {
        const pathWithParams = this.getPathWithQueryString(path, params);
        return this.base(pathWithParams, "GET", {});
    };

    public patch = (path: string, params?: any) => {
        const options: IRequestOptions = { body: JSON.stringify(params) };
        return this.base(path, "PATCH", options);
    };

    public post = (path: string, params?:any) => {
        const options: IRequestOptions = params;
        options.body = JSON.stringify(options.body);
        return this.base(path, "POST", options);
    };

    public put = (path: string, params?: any) => {
        const options: IRequestOptions = { body: JSON.stringify(params) };
        return this.base(path, "PUT", options);
    };

    private getPathWithQueryString = (path: string, params: any) => {
        const esc = encodeURIComponent;
        const query = Object.keys(params)
            .filter(k => params[k])
            .map(k => {
                if (Array.isArray(params[k])) {
                    return params[k]
                        .map((val: any) => `${encodeURIComponent(k)}[]=${encodeURIComponent(val)}`)
                        .join("&");
                }

                return esc(k) + "=" + esc(params[k]);
            }).join("&");

        return query ? path + "?" + query : path;
    };

    private getVersionedPath = (path: string) => {
        const { version } = this.api;
        return version ? `/${version}/${path}` : path;
    };

    private getRequestUrl = (path: string) => {
        const { apiUrl, port } = this.api;
        const versionedPath = this.getVersionedPath(path);

        if (port) {
            return `${apiUrl}${versionedPath}:${port}`;
        } else {
            return `${apiUrl}${versionedPath}`;
        }
    };

    private getUserToken = () => {
        const state = store.getState();
        const user = state.auth.user && state.auth.token;
        return user && user.token || "";
    };

    private getBaseOptions = (method: string, customOptions: any) => {
        const userToken = this.getUserToken();
        const options: IRequestOptions = { method, headers: {}, ...customOptions };
        options.headers.Accept = options.headers["Content-Type"] = "application/json";

        if (userToken) {
            options.headers.Authorization = this.getUserToken();
        }

        return options;
    };

    private base = async (path: string, method: string, customOptions: any) => {
        const options: IRequestOptions = this.getBaseOptions(method, customOptions);
        try {
            const response = await fetch(this.getRequestUrl(path), options);

            if (response.status === 401) {
                const tempResp = response.clone();
                const resp = await tempResp.json();

                if (resp.sessionkey) {
                    return resp;
                }
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
                    return {};
                }
            }
        } catch (err) {
            if (err.message === TIMEOUT_ERROR || err.message === "Network request failed") {
                // store.dispatch(updateInternetState(false));
                console.log("request timeout");
            } else if (err.status === 401) {
                // store.dispatch(logoutSuccess(null));
            }

            throw err;
        }
    }

}

const request = new Request();

export default request;
