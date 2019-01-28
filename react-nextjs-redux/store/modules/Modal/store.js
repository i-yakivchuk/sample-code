import {
    HIDE_MODAL,
    SHOW_MODAL,
    SET_MODAL,
} from './constants';

import {
    hideModal,
    showModal,
    setModal,
} from './reducers';

const defaultState = {
    modalVisible: false,
    modalName: null,
};

// Root reducer
export default (state = defaultState, action) => {
    switch (action.type) {
        case HIDE_MODAL:
            return hideModal(state, action);
        case SHOW_MODAL:
            return showModal(state, action);
        case SET_MODAL:
            return setModal(state, action);
        default:
            return state;
    }
};
