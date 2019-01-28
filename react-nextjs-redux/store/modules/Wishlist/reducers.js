import mergeby from 'mergeby';
import arrayToObject from '../../utils/arrayToObject';

export const getList = (state, action) => {
    const { result } = action;
    const { id, slug } = action.payload;

    let newState;
    switch (action.status) {
        case 'PENDING':
            newState = {
                ...state,
                activeId: id,
            };
            break;
        case 'SUCCESS':
            const mergeKey = slug ? 'slug' : 'id';
            const { users, ...list } = result.payload;
            newState = {
                ...state,
                activeId: result.payload.id,
                entities: mergeby(state.entities, {
                    ...list,
                    users: users.map(({ id: userId }) => userId),
                }, mergeKey),
                users: {
                    ...state.users,
                    ...arrayToObject(users, 'id'),
                },
            };
            break;
        default:
            newState = state;
    }

    return {
        ...newState,
        networkActions: {
            ...state.networkActions,
            [id]: action.type,
        },
        statuses: {
            ...state.statuses,
            [id]: action.status,
        },
    };
};

export const fetchLists = (state, action) => {
    const { result } = action;

    let newState;
    switch (action.status) {
        case 'SUCCESS':
            newState = {
                ...state,
                entities: mergeby(state.entities, result.payload.entities, 'id'),
                totalPages: result.payload.totalPages,
            };
            break;
        default:
            newState = state;
    }

    return {
        ...newState,
        fetchStatus: action.status,
    };
};

export const clearWishlistEntities = (state, action) => {
    let newState;
    switch (action.status) {
        case 'SUCCESS':
            newState = {
                ...state,
                entities:[],
            };
            break;
        default:
            newState = state;
    }

    return {
        ...newState,
        fetchStatus: action.status,
    };
};

export const createList = (state, action) => {
    const { id } = action.payload;

    let newState;
    switch (action.status) {
        case 'PENDING':
            newState = {
                ...state,
                entities: mergeby(state.entities, action.payload, 'id'),
            };
            break;
        case 'SUCCESS':
            newState = {
                ...state,
                entities: mergeby(state.entities, action.result.payload, 'id'),
            };
            break;
        default:
            newState = state;
    }

    return {
        ...newState,
        networkActions: {
            ...state.networkActions,
            [id]: action.type,
        },
        statuses: {
            ...state.statuses,
            [id]: action.status,
        },
    };
};

export const updateList = (state, action) => {
    const { id, update } = action.payload;

    let newState;
    switch (action.status) {
        case 'PENDING':
            newState = {
                ...state,
                entities: mergeby(state.entities, {
                    ...update, id,
                }, 'id'),
            };
            break;
        case 'SUCCESS':
            newState = {
                ...state,
                entities: mergeby(state.entities, {
                    ...action.result.payload, id,
                }, 'id'),
            };
            break;
        default:
            newState = state;
    }

    return {
        ...newState,
        networkActions: {
            ...state.networkActions,
            [id]: action.type,
        },
        statuses: {
            ...state.statuses,
            [id]: action.status,
        },
    };
};

export const removeList = (state, action) => {
    const { id } = action.payload;

    let newState = state;
    switch (action.status) {
        case 'PENDING':
            newState = {
                ...state,
                pendingRemoving: {
                    ...state.pendingRemoving,
                    [id]: true,
                },
            };
            break;
        case 'SUCCESS':
            newState = {
                ...state,
                entities: state.entities.filter(list => list.id !== id),
                pendingRemoving: {
                    ...state.pendingRemoving,
                    [id]: false,
                },
            };
            break;
        default:
            newState = state;
    }

    return {
        ...newState,
        networkActions: {
            ...state.networkActions,
            [id]: action.type,
        },
        statuses: {
            ...state.statuses,
            [id]: action.status,
        },
    };
};

export const fetchListProperties = (state, action) => {
    const { id } = action.payload;

    let newState = state;
    switch (action.status) {
        case 'PENDING':
            newState = {
                ...state,
                currentPage: action.payload.qs ? action.payload.qs.page : state.currentPage,
            };
            break;
        case 'SUCCESS':
            const { entities, totalPages,total } = action.result.payload;
            const newPropertyIds = entities
                .map(({ id: propertyId }) => propertyId);

            newState = {
                ...state,
                totalPages,
                total:total,
                properties: {
                    [id]: (state.properties[id] || []).concat(newPropertyIds),
                },
            };
            break;
        default:
            newState = state;
    }

    return {
        ...newState,
        networkActions: {
            ...state.networkActions,
            [id]: 'FETCHING',
        },
        statuses: {
            ...state.statuses,
            [id]: action.status,
        },
    };
};

export const fetchListPropertiesIds = (state, action) => {
    if (action.status !== 'SUCCESS') {
        return state;
    }

    const propertiesObjectMap = action.result.payload.entities.reduce((lists, list) => {
        lists[list.id] = list.properties;
        return lists;
    }, {});

    return {
        ...state,
        properties: propertiesObjectMap,
    };
};

export const addProperty = (state, action) => {
    const { id, propertyId } = action.payload;

    let newState = state;
    switch (action.status) {
        case 'PENDING':
            newState = {
                ...state,
                properties: {
                    ...state.properties,
                    [id]: (state.properties[id] || []).concat(propertyId),
                },
            };
            break;
        default:
            newState = state;
    }

    return {
        ...newState,
        networkActions: {
            ...state.networkActions,
            [id]: action.type,
        },
        statuses: {
            ...state.statuses,
            [id]: action.status,
        },
    };
};

export const removeProperty = (state, action) => {
    const { id, propertyId } = action.payload;

    let newState = state;
    switch (action.status) {
        case 'PENDING':
            newState = {
                ...state,
                properties: {
                    ...state.properties,
                    [id]: (state.properties[id] || []).filter(propId => propId !== propertyId),
                },
            };
            break;
        default:
            newState = state;
    }

    return {
        ...newState,
        networkActions: {
            ...state.networkActions,
            [id]: action.type,
        },
        statuses: {
            ...state.statuses,
            [id]: action.status,
        },
    };
};

export const inviteUser = (state, action) => {
    const { id } = action.payload;

    return {
        ...state,
        networkActions: {
            ...state.networkActions,
            [id]: action.type,
        },
        statuses: {
            ...state.statuses,
            [id]: action.status,
        },
    };
};

export const confirmInvite = ({ inviteId, invitedUserId }) => {

};

export const removeUser = (state, action) => {
    const { id, removedUserId } = action.payload;

    let newState = state;
    switch (action.status) {
        case 'PENDING':
            newState = {
                ...state,
                users: {
                    ...state.users,
                    [removedUserId]: null
                },
            };
            break;
        case 'SUCCESS':
            newState = {
                ...state,
                users: {
                    ...state.users,
                    [removedUserId]: null,
                    },
                };
            break;
        default:
            newState = state;
    }

    return {
        ...newState,
        networkActions: {
            ...state.networkActions,
            [id]: action.type,
        },
        statuses: {
            ...state.statuses,
            [id]: action.status,
        },
    };

};

export const setSelectedPropertyId = (state, action) => {
    return {
        ...state,
        selectedPropertyId: action.payload.id,
    };
};

export const setSelectedListId = (state, action) => {
    return {
        ...state,
        selectedListId: action.payload.id,
    };
};
