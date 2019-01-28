import {
    HIDE_MODAL,
    SHOW_MODAL,
    SET_MODAL,
} from './constants';

export const hideModal = () => ({
    type: HIDE_MODAL,
});

export const showModal = modalName => ({
    type: SHOW_MODAL,
    payload: { modalName },
});

export const showModalWithParams = ( modalName, disableOverlay ) => ({
    type: SHOW_MODAL,
    payload: { modalName, disableOverlay },
});

export const setModal = modalName => ({
    type: SET_MODAL,
    payload: { modalName },
});
