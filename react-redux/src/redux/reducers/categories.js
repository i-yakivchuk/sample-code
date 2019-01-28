import * as ActionTypes from '../../constants/actions';
import createReducer from '../createReducer';

const initialState = {
    filterList: [],
    list: [],
    selected: {}
};

export const categories = createReducer(initialState, {
    [ActionTypes.GET_CATEGORIES](state, action) {
        return Object.assign({}, state, { error: null, loading: true })
    },
    [ActionTypes.GET_CATEGORIES_SUCCESS](state, action) {
        return Object.assign({}, state, { filterList: action.payload, loading: false })
    },
    [ActionTypes.GET_CATEGORIES_ERROR](state, action) {
        return Object.assign({}, state, { error: true, loading: false })
    },
    [ActionTypes.GET_USER_CATEGORIES](state, action) {
        return Object.assign({}, state, { error: null, loading: true })
    },
    [ActionTypes.GET_USER_CATEGORIES_SUCCESS](state, action) {
        return Object.assign({}, state, { list: action.payload, loading: false })
    },
    [ActionTypes.GET_USER_CATEGORIES_ERROR](state, action) {
        return Object.assign({}, state, { error: true, loading: false })
    },
    [ActionTypes.SELECT_CATEGORY](state, action) {
        return Object.assign({}, state, { selected: action.payload, loading: false })
    },
    [ActionTypes.DELETE_CATEGORY](state, action) {
        let categoryIndex;
        state.list.forEach((a, i) => {
            if(a.Id === action.payload.categoryId) categoryIndex = i;
        });
        state.list.splice(categoryIndex, 1);
        return Object.assign({}, state, { list: [...state.list], loading: false })
    },
});