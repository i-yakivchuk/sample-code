import { combineReducers, applyMiddleware, createStore } from 'redux';
import { reducer as reduxFormReducer } from 'redux-form';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import * as reducers from './moduls';
import { storeState } from '../types';

const getMiddleware = () => {
    if (process.env.NODE_ENV === 'production') {
        return applyMiddleware(thunk);
    } else { // Enable additional logging in non-production environments.
        return applyMiddleware(thunk, createLogger())
    }
};

const rootReducer = combineReducers({
    form: reduxFormReducer,
    ...reducers
});

const store = createStore<storeState, any, any, any>(rootReducer, getMiddleware());

export default store;
