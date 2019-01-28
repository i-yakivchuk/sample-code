import {
    GET_LIST,
    FETCH_LISTS,
    CREATE_LIST,
    UPDATE_LIST,
    REMOVE_LIST,
    FETCH_LIST_PROPERTIES,
    FETCH_LIST_PROPERTIES_IDS,
    ADD_LIST_PROPERTY,
    REMOVE_LIST_PROPERTY,
    INVITE_USER,
    CONFIRM_INVITE,
    REMOVE_USER,
    SET_SELECTED_PROPERTY_ID,
    SET_SELECTED_LIST_ID,
    ADD_USER_VOTE
} from './constants';

import {
    LOGOUT,
} from '../Auth/constants';

import {
    getList,
    fetchLists,
    createList,
    removeList,
    fetchListProperties,
    updateList,
    inviteUser,
    addProperty,
    removeProperty,
    setSelectedPropertyId,
    setSelectedListId,
    fetchListPropertiesIds,
    removeUser,
    addUserPropertyVote,
    clearWishlistEntities,
} from './reducers';

const defaultState = {
    entities: [],
    users: {},
    properties: [],
    networkActions: {},
    statuses: {},
    activeId: null,
    currentPage: 1,
    totalPages: 0,
    selectedPropertyId: null,
    selectedListId: null,
    total:null,
    voteStore:null
};

export default (state = defaultState, action) => {
    switch (action.type) {
        case GET_LIST:
            return getList(state, action);
        case FETCH_LISTS:
            return fetchLists(state, action);
        case CREATE_LIST:
            return createList(state, action);
        case REMOVE_LIST:
            return removeList(state, action);
        case FETCH_LIST_PROPERTIES:
            return fetchListProperties(state, action);
        case FETCH_LIST_PROPERTIES_IDS:
            return fetchListPropertiesIds(state, action);
        case UPDATE_LIST:
            return updateList(state, action);
        case INVITE_USER:
            return inviteUser(state, action);
        case REMOVE_USER:
            return removeUser(state, action);
        case ADD_LIST_PROPERTY:
            return addProperty(state, action);
        case REMOVE_LIST_PROPERTY:
            return removeProperty(state, action);
        case SET_SELECTED_PROPERTY_ID:
            return setSelectedPropertyId(state, action);
        case SET_SELECTED_LIST_ID:
            return setSelectedListId(state, action);
        case LOGOUT:
            return clearWishlistEntities(state, action);
        default:
            return state;
    }
};
