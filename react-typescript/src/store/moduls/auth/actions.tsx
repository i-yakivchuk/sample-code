import * as types from "./types";

export interface setUserData {
    type: types.SET_USER_DATA,
    payload: any
}

export interface updateUserData {
    type: types.UPDATE_USER_DATA,
    payload: any
}

export interface deleteUserData {
    type: types.DELETE_USER_DATA,
    payload: {}
}

export const successLogin = (payload: any): setUserData => ({type: types.SET_USER_DATA, payload: payload});

export const updateUserData = (payload: any): updateUserData => ({type: types.UPDATE_USER_DATA, payload: payload});

export const deleteUserData = (): deleteUserData => ({type: types.DELETE_USER_DATA, payload: {}});

export type UserDataActions = updateUserData | setUserData | deleteUserData;