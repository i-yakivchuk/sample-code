import { createSelector } from 'reselect';
import chunk from 'chunk';
import * as constants from './constants';
import { selectors as propertySelectors } from '../Properties';

export const getRawLists = state => state.wishlistStore.entities;
export const getUsers = state => state.wishlistStore.users;
export const getProperties = state => state.wishlistStore.properties;
export const getTotalPropeties = state => state.wishlistStore.total;
export const getActiveId = state => state.wishlistStore.activeId;
export const getTotalPages = state => state.wishlistStore.totalPages;
export const getCurrentPage = state => state.wishlistStore.currentPage;
export const getNetworkActions = state => state.wishlistStore.networkActions;
export const getStatuses = state => state.wishlistStore.statuses;
export const getSelectedPropertyId = state => state.wishlistStore.selectedPropertyId;
export const getSelectedListId = state => state.wishlistStore.selectedListId;
export const getPropertyVote = state => state.wishlistStore.voteStore.vote;


export const getLists = createSelector([
    getRawLists, getProperties, getSelectedPropertyId,
], (lists, properties, selectedPropertyId) => {
    return lists && lists.map(list => ({
        ...list,
        hasSelectedPropertyId: (properties[list.id] || []).includes(selectedPropertyId),
    })).sort( (a, b) => {
        let dataA= new Date(a.createdAt);
        let dataB = new Date(b.createdAt);
        return dataB - dataA;
    });
});

export const getActiveList = createSelector([
    getLists, getActiveId,
], (lists, activeId) => {
    return lists && lists.find(({ id }) => id === activeId);
});

export const getActiveListUsers = createSelector([
    getActiveList, getUsers,
], (list, users) => {
    if (!list) return [];
    return list.users !=undefined && list.users.map(id => users[id]).filter(isUser => isUser);
});

export const getActiveListProperties = createSelector([
    getActiveId, getProperties, propertySelectors.getProperties,
], (id, listPropertiesMap, properties) => {
    const listPropertyIds = listPropertiesMap[id] || [];
    return properties.filter(({ id: propertyId }) => {
        return listPropertyIds.includes(propertyId);
    });
});

export const getActiveListPropertiesByPage = createSelector([
    getActiveListProperties, getCurrentPage,
], (properties, currentPage) => {
    return properties.slice((currentPage - 1) * 10, currentPage * 10);
});

export const getProximityLocationCoords = createSelector([
    getActiveListProperties,
], (properties) => {
    return {
        lat: properties && properties[0] && properties[0]['lat'] ? properties[0]['lat'] : 53.6000,
        lng: properties && properties[0] && properties[0]['lng'] ? properties[0]['lng'] : -2.165,
        radius: 60000,
    };
});

export const getChunkedListProperties = createSelector([
    getActiveListProperties,
], properties => (
    chunk(properties, 2)
));

export const getChunkedListPropertiesByPage = createSelector([
    getActiveListPropertiesByPage,
], (properties) => {
    return chunk(properties, 2);
});

// Statuses

export const getStatus = createSelector([
    getActiveId, getStatuses,
], (activeId, statuses) => {
    return statuses[activeId];
});

export const getNetworkAction = createSelector([
    getActiveId, getNetworkActions,
], (activeId, networkActions) => {
    return networkActions[activeId];
});

export const getIsLoading = createSelector([
    getNetworkAction, getStatus,
], (networkAction, status) => {
    return networkAction === constants.FETCH_LISTS && status === 'PENDING';
});

export const getIsUpdating = createSelector([
    getNetworkAction, getStatus,
], (networkAction, status) => {
    return networkAction === constants.UPDATE_LIST && status === 'PENDING';
});

export const getIsInviting = createSelector([
    getNetworkAction, getStatus,
], (networkAction, status) => {
    return networkAction === constants.INVITE_USER && status === 'PENDING';
});

export const getIsAddingProperty = createSelector([
    getNetworkAction, getStatus,
], (networkAction, status) => {
    return networkAction === constants.ADD_LIST_PROPERTY && status === 'PENDING';
});

export const getIsRemovingProperty = createSelector([
    getNetworkAction, getStatus,
], (networkAction, status) => {
    return networkAction === constants.REMOVE_LIST_PROPERTY && status === 'PENDING';
});
