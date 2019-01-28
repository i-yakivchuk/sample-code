export const hideModal = (state, action) => ({
    ...state,
    modalVisible: false,
});

export const showModal = (state, action) => ({
    ...state,
    modalVisible: true,
    modalName: action.payload.modalName,
    disableOnOverlay: action.payload.disableOverlay,
});

export const setModal = (state, action) => ({
    ...state,
    modalName: action.payload.modalName,
});
