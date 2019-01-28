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
		ADD_USER_VOTE,
    UPDATE_PROPERTY_VOTE,
} from './constants';

import * as wishlistService from './service';

export const getList = ({ id, slug }) => ({
    type: GET_LIST,
    promise: () => wishlistService.getList({ id, slug }),
    payload: { id, slug },
});

export const getPropertyVotes = ({ id, propertyId }) => async (dispatch, getState) => {
    const result = await wishlistService.getPropertyVotesList({ id, propertyId });

    if (result && result.status === 'success') {
        const { payload } = result;
        const vote = payload && payload.vote ? payload.vote : [];

        dispatch(updatePropertyVote({ propertyId, vote }));
    }
};

export const checkWishlistExist = async ({ id }) => {
    const result = await wishlistService.getList({ id });

    if (result && result.status === 'success') {
        const { payload } = result;
        console.log('payload', result, payload);
        return payload;
    }

    return false;
};

export const updatePropertyVote = ({ propertyId, vote }) => ({
    type: UPDATE_PROPERTY_VOTE,
    payload: { propertyId, vote },
});

export const fetchLists = ( query = {} ) => ({
    type: FETCH_LISTS,
    promise: () => wishlistService.fetchLists({ query }),
});

export const createList = body => ({
    type: CREATE_LIST,
    promise: () => wishlistService.createList(body),
    payload: body,
});

export const updateList = ({ id, update }) => ({
    type: UPDATE_LIST,
    promise: () => wishlistService.updateList({ id, update }),
    payload: { id, update },
});

export const removeList = ({ id }) => ({
    type: REMOVE_LIST,
    promise: () => wishlistService.removeList({ id }),
    payload: { id },
});

export const fetchListProperties = ({ id, qs }) => ({
    type: FETCH_LIST_PROPERTIES,
    promise: () => wishlistService.listProperties({ id, qs }),
    payload: { id, qs },
});

export const fetchListPropertiesIds = () => ({
    type: FETCH_LIST_PROPERTIES_IDS,
    promise: () => wishlistService.listPropertiesIds(),
});

export const addProperty = ({ id, propertyId }) => ({
    type: ADD_LIST_PROPERTY,
    promise: () => wishlistService.addProperty({ id, propertyId }),
    payload: { id, propertyId },
});

export const addUserPropertyVote = ({ id, propertyId, vote, user }) => ({
		type: ADD_USER_VOTE,
		promise: () => wishlistService.addUserPropertyVote({ id, propertyId, vote }),
		payload: { id, propertyId, vote, updates: { vote: vote, user: user }},
});

export const removeProperty = ({ id, propertyId }) => ({
    type: REMOVE_LIST_PROPERTY,
    promise: () => wishlistService.removeProperty({ id, propertyId }),
    payload: { id, propertyId },
});

export const inviteUser = ({ id, invitedUserId, invitedUserEmail }) => ({
    type: INVITE_USER,
    promise: () => wishlistService.inviteUser({ id, invitedUserId, invitedUserEmail }),
    payload: { id, invitedUserId, invitedUserEmail },
});

export const confirmInvite = ({ inviteId, invitedUserId }) => ({
    type: CONFIRM_INVITE,
    promise: () => wishlistService.confirmInvite({ inviteId, invitedUserId }),
    payload: { inviteId, invitedUserId },
});

export const removeUser = ({ id, removedUserId }) => ({
    type: REMOVE_USER,
    promise: () => wishlistService.removeUser({ id, removedUserId }),
    payload: { id, removedUserId },
});

export const setSelectedPropertyId = ({ id }) => ({
    type: SET_SELECTED_PROPERTY_ID,
    payload: { id },
});

export const setSelectedListId = ({ id }) => ({
    type: SET_SELECTED_LIST_ID,
    payload: { id },
});
