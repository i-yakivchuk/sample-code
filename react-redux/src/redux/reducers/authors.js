import * as ActionTypes from '../../constants/actions';
import createReducer from '../createReducer';

const initialState = {
    filterList: []
};

export const authors = createReducer(initialState, {
    [ActionTypes.GET_AUTHORS](state, action) {
        return Object.assign({}, state, { error: null, loading: true })
    },
    [ActionTypes.GET_AUTHORS_SUCCESS](state, action) {
        return Object.assign({}, state, { filterList: action.payload, loading: false })
    },
    [ActionTypes.GET_AUTHORS_ERROR](state, action) {
        return Object.assign({}, state, { error: true, loading: false })
    },
});