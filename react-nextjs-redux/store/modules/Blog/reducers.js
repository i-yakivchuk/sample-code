import mergeby from 'mergeby';

export const getPost = (state, action) => {
    const { result } = action;

    switch (action.status) {
        case 'SUCCESS':
            return {
                ...state,
                entities: mergeby(state.entities, result.payload, 'id'),
            };
        default:
            return state;
    }
};

export const fetchPosts = (state, action) => {
    const { result } = action;

    let newState;
    switch (action.status) {
        case 'SUCCESS':
            newState = {
                ...state,
                entities: mergeby(state.entities, result.payload.entities, 'id'),
                totalPages: result.payload.totalPages || state.totalPages,
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

export const fetchCategories = (state, action) => {
    const { result } = action;

    switch (action.status) {
        case 'SUCCESS':
            return {
                ...state,
                categories: mergeby(state.categories, result.payload.entities, 'id'),
            };
        default:
            return state;
    }
};

export const setActivePostSlug = (state, action) => ({
    ...state,
    activePostSlug: action.payload.slug,
});

export const setActivePostPage = (state, action) => ({
    ...state,
    activePostPage: action.payload.page,
});

export const setActiveCategoryId = (state, action) => ({
    ...state,
    activeCategoryId: action.payload.id,
});

export const setSearchValue = (state, action) => ({
    ...state,
    searchValue: action.payload.search,
});
