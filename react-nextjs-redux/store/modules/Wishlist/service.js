import omit from 'object.omit';
import fetch from '../../../utils/fetch';
import config from '../../../config';

export const getList = ({ id, slug }) => (
    fetch(`/api/wishlist/${id || slug}`)
);

export const getPropertyVotesList = ({ id, propertyId }) => (
    fetch(`/api/votes/wishlist/${id}/${propertyId}`)
);

export const fetchLists = ({ query }) => (
    fetch('/api/wishlist',{
        method: 'GET',
        qs: query
    })
);

export const createList = body => (
    fetch('/api/wishlist', {
        method: 'POST',
        body,
    })
);

export const updateList = ({ id, update }) => (
    fetch(`/api/wishlist/${id}`, {
        method: 'PUT',
        body: update,
    })
);

export const removeList = ({ id }) => (
    fetch(`/api/wishlist/${id}`, {
        method: 'DELETE',
    })
);

export const listProperties = ({ id, qs }) => (
    fetch(`/api/wishlist/${id}/properties`, {
        method: 'GET',
        qs,
    })
);

export const listPropertiesIds = () => (
    fetch('/api/wishlist/all/properties/ids', {
        method: 'GET',
    })
);

export const addProperty = ({ id, propertyId }) => (
    fetch(`/api/wishlist/${id}/properties/${propertyId}`, {
        method: 'POST',
    })
);

export const addUserPropertyVote = ({ id, propertyId, vote }) => (
		fetch(`/api/wishlist/${id}/properties/${propertyId}/vote`, {
				method: 'POST',
        body: { vote }
		})
);

export const removeProperty = ({ id, propertyId }) => (
    fetch(`/api/wishlist/${id}/properties/${propertyId}`, {
        method: 'DELETE',
    })
);

export const inviteUser = ({ id, invitedUserId, invitedUserEmail }) => (
    fetch(`/api/wishlist/${id}/invite`, {
        method: 'POST',
        body: { invitedUserId, invitedUserEmail },
    })
);

export const confirmInvite = ({ inviteId, invitedUserId }) => (
    fetch(`/api/wishlist/confirm-invite/${inviteId}`, {
        method: 'PUT',
        body: { invitedUserId },
    })
);
export const removeUser = ({ id, removedUserId }) => (
    fetch(`/api/wishlist/${id}/users/${removedUserId}`, {
        method: 'DELETE',
    })
);

