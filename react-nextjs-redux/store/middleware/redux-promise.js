export const PENDING = 'PENDING';
export const SUCCESS = 'SUCCESS';
export const FAIL = 'FAIL';

export default function promiseMiddleware({ dispatch }) {
    return next => (action) => {
        const { promise, type, ...rest } = action;

        // Pass action on if not promise
        if (!promise) {
            return next(action);
        }

        // Begin action
        next({ ...rest, type, status: PENDING });
        
        return promise().then(
            (result) => {
                // Success action
                dispatch({ ...rest, result, type, status: SUCCESS });
            },
            (error) => {
                // TODO - test network loss and respond with
                // catch actions and re-do when connection back in
                // another middleware
                // console.log(error.code);
                // console.log(error.name);
                // console.log(error.message);
                // Fail action
                dispatch({ ...rest, error, type, status: FAIL });
            }
        );
    };
}

// Example of action creator for this
function networkCall() {
    return {
        type: 'GET_COLLECTION_CONTENT',
        promise: () => {
            return new Promise((resolve, reject) => {
                fetch({
                    url: 'example.com/api',
                    type: 'GET',
                });
            });
        },
    };
}
