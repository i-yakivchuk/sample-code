/**
 * Created by ivan on 28.01.18.
 */
import * as api from '../api/slides';
import { store } from '../redux/store';
import * as action from '../constants/actions';
import * as R from 'ramda';


//get messages for filter archive messages
export const getArchiveMessagesSuccess = (payload) => { return { type: action.GET_ARCHIVE_MESSAGES_SUCCESS, payload: payload }};
export const getArchiveMessagesError = () => ({ type: action.GET_ARCHIVE_MESSAGES_ERROR });
export const getArchiveMessagesRequest = () => ({ type: action.GET_ARCHIVE_MESSAGES_REQUEST });
export const getArchiveMessages = () => (dispatch) => {
	let customerId = store.getState().user.current.CustomerId;
	dispatch(getArchiveMessagesRequest());

	return api.getArchiveMessages(customerId).then(res => {
		dispatch(getArchiveMessagesSuccess(res.data));
	}).catch(() => {
		dispatch(getArchiveMessagesError());
	});
};

//filter archive
export const filterMessages = (payload) => ({ type: action.FILTER_ARCHIVE_MESSAGE, payload });

//select active message
export const selectArchiveMessage = (payload) => ({ type: action.SELECT_ARCHIVE_MESSAGE, payload: payload });

//delete archive messages
export const deleteArchiveMessageSuccess = () => ({ type: action.DELETE_ARCHIVE_MESSAGE_SUCCESS });
export const deleteArchiveMessageError = () => ({ type: action.DELETE_ARCHIVE_MESSAGE_ERROR });
export const deleteArchiveMessageRequest = () => ({ type: action.DELETE_ARCHIVE_MESSAGE_REQUEST });
export const deleteArchiveMessages = (ids) => (dispatch) => {
	dispatch(deleteArchiveMessageRequest());

	return api.deleteMessages(ids).then(() => {
		dispatch(deleteArchiveMessageSuccess());
		dispatch(getArchiveMessages());
	}).catch(() => {
		dispatch(deleteArchiveMessageError());
	});
};

//add checkbox selected message
export const checkedArchiveMessage = (payload) => ({ type: action.CHECKED_ARCHIVE_MESSAGE, payload: payload });
export const checkedAllArchiveMessages = (payload) => ({ type: action.CHECKED_ALL_ARCHIVE_MESSAGES, payload: payload });

//retrieve archive messages
export const retrieveArchiveMessagesSuccess = () => ({ type: action.RETRIEVE_ARCHIVE_MESSAGE_SUCCESS });
export const retrieveArchiveMessagesError = () => ({ type: action.RETRIEVE_ARCHIVE_MESSAGE_ERROR });
export const retrieveArchiveMessagesRequest = () => ({ type: action.RETRIEVE_ARCHIVE_MESSAGE_REQUEST });
export const retrieveArchiveMessages = (ids) => (dispatch) => {
	dispatch(retrieveArchiveMessagesRequest());

	let customerId = store.getState().user.current.CustomerId;
	let messages = store.getState().archive.messages;
	let retrieve = messages.filter((item) => R.contains(item.Id, ids));

	retrieve.map((item) => {
		item.StartOn = null;
		item.EndOn = null;
		item.IsPublished = false;
	});

	return api.retrieveMessages(retrieve, customerId).then(() => {
		dispatch(retrieveArchiveMessagesSuccess());
		dispatch(getArchiveMessages());
	}).catch(() => {
		dispatch(retrieveArchiveMessagesError());
	});
};
