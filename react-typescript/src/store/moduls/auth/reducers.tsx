import { combineReducers } from 'redux';
import * as actions from "./actions";
import * as types from "./types";
import Cookies from 'universal-cookie';

const saveTokenLocally = (data: any) => {
    const cookies = new Cookies();
    cookies.set(types.TOKEN_KEY, data.token, {path: '/'})
    return data
}

const deleteUserData = (emptyObj: {}) => {
    const cookies = new Cookies();
    cookies.remove(types.TOKEN_KEY, {path: '/'});
    return emptyObj
}

const user = (state={}, action: actions.UserDataActions): any => {
    switch (action.type){
        case types.SET_USER_DATA:
            return saveTokenLocally(action.payload)
        case types.UPDATE_USER_DATA:
            return {...state, ...action.payload}
        case types.DELETE_USER_DATA:
            return deleteUserData(action.payload)
        default:
            const cookies = new Cookies();
            return {token: cookies.get(types.TOKEN_KEY) || ''};
    }
}

export default combineReducers({
    user
});