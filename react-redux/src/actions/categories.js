import * as api from '../api/categories';
import * as slideActionTypes from '../constants/actions';

export const categoriesSuccess = (payload) => ({ type: slideActionTypes.GET_CATEGORIES_SUCCESS, payload: payload });
export const categoriesError = authors => ({ type: slideActionTypes.GET_CATEGORIES_ERROR });
export const categoriesRequest = authors => ({ type: slideActionTypes.GET_CATEGORIES });
export const categories = (params) => (dispatch) => {
    dispatch(categoriesRequest());

    return api.categories(params).then(res => {
        dispatch(categoriesSuccess(res.data));
    }).catch(e => {
        dispatch(categoriesError());
    });
};

export const selectCategory = (payload) => ({ type: slideActionTypes.SELECT_CATEGORY, payload: payload });

export const userCategoriesSuccess = (payload) => ({ type: slideActionTypes.GET_USER_CATEGORIES_SUCCESS, payload: payload });
export const userCategoriesError = category => ({ type: slideActionTypes.GET_USER_CATEGORIES_ERROR });
export const userCategoriesRequest = category => ({ type: slideActionTypes.GET_USER_CATEGORIES });
export const userCategories = (params) => (dispatch) => {
    dispatch(userCategoriesRequest());

    return api.allCategories(params).then(res => {
        dispatch(userCategoriesSuccess(res.data.sort((a, b) => new Date(b.CreatedOn) - new Date(a.CreatedOn))));
    }).catch(e => {
        dispatch(userCategoriesError());
    });
};

export const deleteCategorySuccess = (payload) => ({ type: slideActionTypes.DELETE_CATEGORY, payload: payload });
export const deleteCategory = (params) => (dispatch) => {
    return api.deleteCategory(params).then(res => {
        dispatch(deleteCategorySuccess(params));
    }).catch(e => {
        dispatch(userCategoriesError());
    });
};

export const createCategorySuccess = (payload) => ({ type: slideActionTypes.CREATE_USER_CATEGORY_SUCCESS, payload: payload });
export const createCategoryError = category => ({ type: slideActionTypes.CREATE_USER_CATEGORY_ERROR });
export const createCategoryRequest = category => ({ type: slideActionTypes.CREATE_USER_CATEGORY });
export const createCategory = (params) => (dispatch) => {
    dispatch(createCategoryRequest());

    return api.createCategory(params).then(res => {
        dispatch(selectCategory(res.data));
        dispatch(userCategories(params));
    }).catch(e => {
        dispatch(createCategoryError());
    });
};

export const updateCategory = (params) => (dispatch) => {
    dispatch(createCategoryRequest());

    return api.updateCategory(params).then(res => {
        dispatch(selectCategory(res.data));
        dispatch(userCategories(params));
    }).catch(e => {
        dispatch(createCategoryError());
    });
};