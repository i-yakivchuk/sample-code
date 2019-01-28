import Router from 'next/router';
import getQueryString from '../../../utils/getQueryString';
import { constants as authConstants, selectors as authSelectors } from '../Auth';
import * as wishlistActions from './actions';
import * as wishlistConstants from './constants';

const handleRemoveWishlist = ({ dispatch, getState }) => next => (action) => {
    next(action);

    // On confirm invite > navigate to wishlist
    if (action.type === wishlistConstants.REMOVE_LIST && action.status === 'PENDING') {
        Router.replace('/favourites');
    }
};

const handleConfirmInvite = ({ dispatch, getState }) => next => (action) => {
    next(action);

    // On confirm invite > navigate to wishlist
    if (action.type === wishlistConstants.CONFIRM_INVITE) {
        Router.replace(`/favourites`);
    }
};

const handleLogin = ({ dispatch, getState }) => next => (action) => {
    next(action);

    // On Login/Register > confirm invite
    if (action.status !== 'SUCCESS') return;
    if (![authConstants.LOGIN, authConstants.CREATE_ACCOUNT].includes(action.type)) {
        return;
    }

    const { id: inviteId } = getQueryString();
    if (!inviteId) return;

    // On login/register, get user id and invite id and confirm invite
    // then redirect to list
    const state = getState();
    const invitedUserId = authSelectors.getAuthenticatedUser(state).id;
    dispatch(wishlistActions.confirmInvite({ inviteId, invitedUserId }));
};

export default [
    handleRemoveWishlist,
    handleConfirmInvite,
    handleLogin,
];
