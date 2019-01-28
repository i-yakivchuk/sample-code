import promiseReturner from './utils/promiseReturner';
import { actions as authActions } from '../store/modules/Auth';

// Dispatch any app wide actions
// to pre-populate state before page render
const prePopulateStore = async ({ dispatch, getState }, req) => {
    let payload;
    
    const refreshAction = promiseReturner(authActions.getAuthUser)({ cookies: req.cookies });
    const promise = dispatch(refreshAction);

    try {
        payload = await promise;
    } catch (e) {}

    return payload;
};

export default async (ctx) => {
    const data = await prePopulateStore(ctx.store, ctx.req);

    // Attach cookies from initial isomorphic responses
    // to main response
    if (data) {
        const cookieHeders = data.headers['set-cookie'] || [];
        cookieHeders.map(cookie => (
            ctx.res.setHeader('Set-Cookie', cookie)
        ));
    }
};
