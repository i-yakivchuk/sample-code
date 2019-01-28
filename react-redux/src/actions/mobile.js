/**
 * Created by ivan on 06.03.18.
 */
import Axios, { CancelToken } from 'axios';
import { success, error } from 'react-notification-system-redux';
import { SERVER_ERROR } from '../constants/errors';
import * as api from '../api/mobile';
import { store } from '../redux/store';
import * as mobileActionTypes from '../constants/actions';
import { reset, getFormValues, change } from 'redux-form';
import mobile from '../models/mobile';
import slide from '../models/slide';
import { toDataURL } from '../utils/utils';


export const slidesSuccess = (payload) => ({ type: mobileActionTypes.GET_MOBILE_MESSAGES_SUCCESS, ...preSlides(payload)});
export const getMobileMessagesError = slides => ({ type: mobileActionTypes.GET_MOBILE_MESSAGES_ERROR });
export const getMobileMessagesRequest = slides => ({ type: mobileActionTypes.GET_MOBILE_MESSAGES_REQUEST });
export const getMobileMessages = () => (dispatch) => {
	const customerId = store.getState().user.current.CustomerId;
	dispatch(getMobileMessagesRequest());

	return api.getMoblieMessages(customerId).then(res => {
		dispatch(slidesSuccess(res.data.Messages));
	}).catch(e => {
		dispatch(getMobileMessagesError());
	});
};

const preSlides = (payload) => {
	let count =  { concept: 0, active: 0, planned: 0 };
	let slides = [];

	payload.map((item) => {
		if (item.IsPublished) {
			if ((!item.StartOn || new Date(item.StartOn) <= new Date()) && (!item.EndOn || new Date(item.EndOn) >= new Date())) {
				item.Status = "active";
				++count.active;
			} else if ((new Date(item.StartOn) >= new Date() || !item.EndOn)) {
				item.Status = "planned";
				++count.planned;
			}
		} else {
			item.Status = "concept";
			++count.concept;
		}

		slides.push(item);
	});

	slides.sort((a, b) => new Date(b.CreatedOn) - new Date(a.CreatedOn));
	return { payload: slides, count }
};

export const filterMobileMessages = (payload) => ({ type: mobileActionTypes.FILTER_MOBILE_MESSAGES, payload });
export const selectMobileMessage = (payload) => ({ type: mobileActionTypes.SELECT_MOBILE_MESSAGE, payload: payload });
export const selectNewMessage = () => ({ type: mobileActionTypes.SELECT_MOBILE_MESSAGE, payload: slide.create() });


//delete mobile message
export const deleteMobileMessageSuccess = (payload) => ({ type: mobileActionTypes.DELETE_MOBILE_MESSAGES_SUCCESS });
export const deleteMobileMessageError = slides => ({ type: mobileActionTypes.DELETE_MOBILE_MESSAGES_ERROR });
export const deleteMobileMessageRequest = slides => ({ type: mobileActionTypes.DELETE_MOBILE_MESSAGES_REQUEST });
export const deleteMobileMessage = (id) => (dispatch) => {
	dispatch(deleteMobileMessageRequest());

	return api.deleteMobileMessage(id).then(res => {
		dispatch(deleteMobileMessageSuccess());
		dispatch(getMobileMessages());
	}).catch(() => {
		dispatch(deleteMobileMessageError());
	});
};

export const getMobileMessageChange = () => {
	let update = {};
	const selectedMessage = store.getState().mobile.selectedMessage;
	const mobileMessageContentForm = 'mobile-message-content';
	const mobileMessagePublishSettingsForm = 'mobile-message-publish-settings';
	const mobileMessageContentValues = getFormValues(mobileMessageContentForm)(store.getState());
	const mobileMessageSettingsValues = getFormValues(mobileMessagePublishSettingsForm)(store.getState());
	const messageAttachment = mobileMessageContentValues['ImageOrVideo'];

	//TODO change this
	if (selectedMessage.Id === 0) {
		const cmp = {
			Code: "FULLSCREENVIDEO2",
			Description: "FULLSCREENVIDEO2",
			Dirty: false,
			FileName: "FULLSCREENVIDEO2.swf",
			Hash: "347611D886AEBF273AEC592C7322B217",
			Id : 231,
			Name: "FULLSCREENVIDEO2"
		};

		update = Object.assign({}, update, { Composition: cmp });
	}

	//add content
	let text = '';
	if (mobileMessageContentValues['Message']) text += '<Message>' + mobileMessageContentValues['Message'] + '</Message>';
	if (mobileMessageContentValues['Title']) text += '<title>' + mobileMessageContentValues['Title'] + '</title>';
	if (mobileMessageContentValues['Intro']) text += '<Intro>' + mobileMessageContentValues['Intro'] + '</Intro>';
	update = Object.assign({}, update, { Text: text ? `<data>${text}</data>` : '' });

	//add video
	if (messageAttachment && messageAttachment.messageFileType === 'video' && !messageAttachment.url) {
		const videoAttachments = mobile.getRawMessageAttachments({hashName: messageAttachment.hashName});
		if (videoAttachments)
			update = Object.assign({}, update, { Attachments: [], RawMessageAttachments: [videoAttachments] });
	}

	//add image
	if (messageAttachment && messageAttachment.messageFileType === 'image' && !messageAttachment.url) {
		const imageAttachments = mobile.getMessageAttachments(messageAttachment.hashName);
		if (imageAttachments)
			update = Object.assign({}, update, { Attachments: [imageAttachments], });
	}

	//delete attachment
	if (!messageAttachment)
		update = Object.assign({}, update, { Attachments: [] }); //delete image or video

	return Object.assign({}, selectedMessage, update, mobileMessageSettingsValues);
};

//reset mobile page form for discard slice
export const resetMobileForm = (form) => (dispatch) => dispatch(reset(form));

//publish mobile message
export const publishMobileMessage = () => (dispatch) => {
	dispatch({ type: mobileActionTypes.PUBLISHED_MOBILE_MESSAGE_SUBMITTING });
	const mobileMessageContentForm = 'mobile-message-content';
	const mobileMessageContentValues = getFormValues(mobileMessageContentForm)(store.getState());
	const messageAttachment = mobileMessageContentValues['ImageOrVideo'];

	//check mobile message image change
	if (messageAttachment && messageAttachment.messageFileType === 'image' && (!messageAttachment.hashName && !messageAttachment.url ||  messageAttachment.blobData)) {
		try {
			const dataFile = messageAttachment.blobData || messageAttachment;
			toDataURL(messageAttachment.blobData ? URL.createObjectURL(dataFile): messageAttachment.tmpUrl, function (data) {
				let srcData = data.replace(/^data:image\/[a-z]+;base64,/, ""); // <--- data: base64
				const formData = Object.assign({}, { 'fileName': messageAttachment.name || '', 'fileData': srcData });

				dispatch(uploadMobileMessageImage(formData, messageAttachment));
			}.bind(this));
		} catch (errors) {
			dispatch({ type: mobileActionTypes.UPDATE_MOBILE_MESSAGE_ERROR });
			dispatch(error({ title: SERVER_ERROR, message: errors.response.data ? errors.response.data : SERVER_ERROR, position: 'tc', autoDismiss: 5}));
		}
	} else {
		try {
			const _message = getMobileMessageChange();
			dispatch(saveMobileMessage(_message));
		} catch (errors) {
			dispatch({ type: mobileActionTypes.UPDATE_MOBILE_MESSAGE_ERROR });
			dispatch(error({ title: SERVER_ERROR, message: errors.response.data ? errors.response.data : SERVER_ERROR, position: 'tc', autoDismiss: 5}));
		}
	}
};


export const saveMobileMessageSuccess = (payload) => ({ type: mobileActionTypes.SAVE_MOBILE_MESSAGES_SUCCESS, payload: payload });
export const saveMobileMessageError = slides => ({ type: mobileActionTypes.SAVE_MOBILE_MESSAGES_ERROR });
export const saveMobileMessageRequest = slides => ({ type: mobileActionTypes.SAVE_MOBILE_MESSAGES_REQUEST });
export const saveMobileMessage = (params) => (dispatch) => {
	dispatch(saveMobileMessageRequest());
	let customerId = store.getState().user.current.CustomerId;

	return api.saveMobileMessage(params, customerId).then(res => {
		dispatch(saveMobileMessageSuccess(res.data));
		dispatch(saveMobileUserMessageTags(res.data));
	}).catch((errors) => {
		dispatch(saveMobileMessageError());
		dispatch(error({ title: SERVER_ERROR, message: errors.response.data ? errors.response.data : SERVER_ERROR, position: 'tc', autoDismiss: 5}));
	});
};


//save mobile message user tags
export const saveMobileUserMessageTagsSuccess = (payload) => ({ type: mobileActionTypes.SAVE_MOBILE_MESSAGES_SUCCESS, payload: payload });
export const saveMobileUserMessageTagsError = slides => ({ type: mobileActionTypes.SAVE_MOBILE_MESSAGES_ERROR });
export const saveMobileUserMessageTagsRequest = slides => ({ type: mobileActionTypes.SAVE_MOBILE_MESSAGES_REQUEST });
export const saveMobileUserMessageTags = (message) => (dispatch) => {
	let customerId = store.getState().user.current.CustomerId;

	dispatch(saveMobileUserMessageTagsRequest());

	const settings = getFormValues('mobile-message-publish-settings')(store.getState());
	const mobileMessageUsers = settings['Users'];
	const jobIds = mobileMessageUsers['Jobs'] && mobileMessageUsers['Jobs'].filter(item => item.Selected).map(item => item.Id);
	const departmentIds = mobileMessageUsers['Departments'] && mobileMessageUsers['Departments'].filter(item => item.Selected).map(item => item.Id);
	const companyIds = mobileMessageUsers['Companies'] && mobileMessageUsers['Companies'].filter(item => item.Selected).map(item => item.Id);
	const usersIds = mobileMessageUsers['Users'] && mobileMessageUsers['Users'].filter(item => item.Selected).map(item => item.Id);

	const tags = {
		'MessageId': message.Id,
		'SelectedUsers': usersIds || [],
		'JobIds': jobIds || [],
		'CompanyIds': companyIds || [],
		'DepartmentIds': departmentIds || [],
	};

	return api.saveMobileUserMessageTags(tags, customerId).then(res => {
		dispatch(saveMobileUserMessageTagsSuccess(res.data));
		dispatch(hidePublishedPopup());
		setTimeout(() => { dispatch(getMobileMessages()); }, 800);
	}).catch(() => {
		dispatch(saveMobileUserMessageTagsError());
	});
};


//upload mobile message video
export const uploadMobileMessageVideoRequest = () => ({ type: mobileActionTypes.UPLOAD_MOBILE_MESSAGE_VIDEO_REQUEST });
export const startUploadMobileMessageVideo = (payload) => ({ type: mobileActionTypes.START_UPLOAD_MOBILE_MESSAGE_VIDEO, payload: payload });
export const endUploadMobileMessageVideo = (payload) => ({ type: mobileActionTypes.END_UPLOAD_MOBILE_MESSAGE_VIDEO });
export const setUploadMobileMessageVideoPercent = (payload) => ({ type: mobileActionTypes.SET_UPLOAD_MOBILE_MESSAGE_VIDEO_PERCENT, payload: payload });
export const closeUploadMobileMessageVideo = () => ({ type: mobileActionTypes.CANCEL_UPLOAD_MOBILE_MESSAGE_VIDEO });

let isCanceled = false;
let cancelRequest;
export const cancelUploadMobileMessageVideo = () => (dispatch) => {
	cancelRequest();
	isCanceled = true;
};

export const uploadMobileMessageVideoSuccess = (payload, file) => (dispatch) => {
	file.hashName = payload; //add hash file name
	dispatch(change('mobile-message-content', 'ImageOrVideo', file));
	dispatch(({ type: mobileActionTypes.UPLOAD_MOBILE_MESSAGE_VIDEO_SUCCESS, payload: payload }));
};

export const uploadMobileMessageVideoError = (payload) => ({ type: mobileActionTypes.UPLOAD_MOBILE_MESSAGE_VIDEO_ERROR });
export const uploadMobileMessageVideo = (file) => (dispatch) => {
	dispatch(uploadMobileMessageVideoRequest());
	dispatch(startUploadMobileMessageVideo({name: file.name || ''}));
	isCanceled = false;
	const config = { cancelToken: new CancelToken(((c) => { cancelRequest = c; })), onUploadProgress: (progressEvent) => { dispatch(setUploadMobileMessageVideoPercent(Math.round( (progressEvent.loaded * 100) / progressEvent.total )))}};
	let formData = new FormData();

	formData.append('fileName', file.name || '');
	formData.append('fileData', file);

	return api.uploadVideoMobileMessage(formData, config).then(res => {
		dispatch(endUploadMobileMessageVideo());
		setTimeout(() => { dispatch(uploadMobileMessageVideoSuccess(res.data, file)); }, 1000); //set timeout for hold upload modal
	}).catch((errors) => {
		if (isCanceled) dispatch({ type: mobileActionTypes.CANCEL_UPLOAD_MOBILE_MESSAGE_VIDEO});
		if (!isCanceled) {
			dispatch(uploadMobileMessageVideoError());
			dispatch(error({ title: SERVER_ERROR, message: errors.response.data ? errors.response.data : SERVER_ERROR, position: 'tc', autoDismiss: 5}));
		}
	});
};


//upload mobile message image
export const uploadMobileImageMessageImageRequest = slides => ({ type: mobileActionTypes.UPLOAD_MOBILE_MESSAGE_IMAGE_REQUEST });
export const uploadMobileMessageImageError= slides => ({ type: mobileActionTypes.UPLOAD_MOBILE_MESSAGE_IMAGE_ERROR });
export const uploadMobileMessageImage = (params, file) => (dispatch) => {
	dispatch(uploadMobileImageMessageImageRequest());

	return api.uploadMobileMessageImage(params).then(res => {
		dispatch(uploadMobileMessageImageSuccess(res.data, file));
	}).catch((errors) => {
		dispatch(uploadMobileMessageImageError());
		dispatch(error({ title: SERVER_ERROR, message: errors.response.data ? errors.response.data : SERVER_ERROR, position: 'tc', autoDismiss: 5}));
	});
};

export const uploadMobileMessageImageSuccess = (payload, file) => (dispatch) => {
	file.hashName = payload; //add hash file name
	delete file.blobData;
	delete file.url;
	dispatch(change('mobile-message-content', 'ImageOrVideo', file));
	dispatch(({ type: mobileActionTypes.UPLOAD_MOBILE_MESSAGE_IMAGE_SUCCESS }));
	dispatch(publishMobileMessage()); //save mobile message after image upload
};


//run encoding mobile message video process bar
export const encodingMobileMessageVideoSuccess = (payload) => ({ type: mobileActionTypes.ENCODING_MOBILE_MESSAGE_VIDEO_SUCCESS });
export const encodingMobileMessageVideoError = () => ({ type: mobileActionTypes.ENCODING_MOBILE_MESSAGE_VIDEO_ERROR });
export const encodingMobileMessageVideoRequest = () => ({ type: mobileActionTypes.ENCODING_MOBILE_MESSAGE_VIDEO_REQUEST });
export const encodingMobileMessageVideo = (rawMessageAttachmentId, messageId) => (dispatch) => {
	dispatch(encodingMobileMessageVideoRequest());

	return api.getRawMobileMessageAttachment(rawMessageAttachmentId).then(res => {
		dispatch(encodingMobileMessageVideoSuccess());
		const encodingProgress = res.data;

		if (encodingProgress && encodingProgress.StatusDescription !== 'Error') {
			dispatch(updateMobileMessageRawAttachment(encodingProgress, messageId));
			setTimeout(() => { dispatch(encodingMobileMessageVideo(encodingProgress.Id, messageId)); }, 10000);
		} else {
			dispatch(encodingMobileMessageVideoError());
		}
	}).catch(() => {
		dispatch(getMobileMessageById(messageId)); //update message
	});
};

//update mobile message raw attachment
export const updateMobileMessageRawAttachmentSuccess = (payload, messageId) => ({ type: mobileActionTypes.UPDATE_MOBILE_MESSAGE_RAW_ATTACHMENT_SUCCESS,  payload: payload, messageId: messageId });
export const updateMobileMessageRawAttachmentRequest = () => ({ type: mobileActionTypes.UPDATE_MOBILE_MESSAGE_RAW_ATTACHMENT_REQUEST });
export const updateMobileMessageRawAttachment = (encodingProgress, messageId) => (dispatch) => {
	dispatch(updateMobileMessageRawAttachmentRequest());
	dispatch(updateMobileMessageRawAttachmentSuccess(encodingProgress, messageId));
};


//get mobile message by id and update
export const getMobileMessageByIdSuccess = (payload) => ({ type: mobileActionTypes.GET_MOBILE_MESSAGE_BY_ID_SUCCESS });
export const updateMobileMessageSuccess = (payload) => ({ type: mobileActionTypes.UPDATE_MOBILE_MESSAGE_SUCCESS, payload: payload });
export const getMobileMessageByIdRequest = () => ({ type: mobileActionTypes.GET_MOBILE_MESSAGE_BY_ID_REQUEST });
export const getMobileMessageById = (id) => (dispatch) => {
	dispatch(getMobileMessageByIdRequest());

	api.getMobileMessageById(id).then(res => {
		dispatch(getMobileMessageByIdSuccess());
		dispatch(updateMobileMessageSuccess(res.data));
	}).catch(() => {
		dispatch(getMobileMessages());
	});
};


export const getMobileMessageUsersSuccess = (payload) => ({ type: mobileActionTypes.GET_MOBILE_MESSAGE_USERS_SUCCESS, payload: payload });
export const getMobileMessageUsersError = slides => ({ type: mobileActionTypes.GET_MOBILE_MESSAGE_USERS_ERROR });
export const getMobileMessageUsersRequest = slides => ({ type: mobileActionTypes.GET_MOBILE_MESSAGE_USERS_REQUEST });
export const getMobileMessageUsers = (messageId) => (dispatch) => {
	dispatch(getMobileMessageUsersRequest());

	return api.getMobileMessageUsers(messageId).then(res => {
		const users = res.data;

		users['Users'] && users['Users'].map((item) => {
			if (messageId == 0) {
				item.Active = true;
				item.Selected = true;
			}
		});

		dispatch(getMobileMessageUsersSuccess(users));
	}).catch(() => {
		dispatch(getMobileMessageUsersError());
	});
};


export const changeMobileMessageUsers = (users) => (dispatch) => {
	dispatch(change('mobile-message-publish-settings', 'Users', users));
};

export const changeMobileMessageImageSize = (blob) => (dispatch) => {
	const mobileMessageContentForm = 'mobile-message-content';
	const mobileMessageContentValues = getFormValues(mobileMessageContentForm)(store.getState());
	const messageAttachment = mobileMessageContentValues['ImageOrVideo'];
	let _messageAttachment;

	if (!blob) {
		delete messageAttachment.blobData;
		_messageAttachment = Object.assign({}, messageAttachment, { name: messageAttachment.name });
	} else {
		_messageAttachment = Object.assign({}, messageAttachment, { name: messageAttachment.name, blobData: blob });
	}

	dispatch(change(mobileMessageContentForm, 'ImageOrVideo', _messageAttachment));
};

//show hide published popup
export const hidePublishedPopup = () => (dispatch) => {  setTimeout(() => { dispatch(({ type: mobileActionTypes.MOBILE_HIDE_PUBLISHED_POPUP })); }, 2000); };
export const showPublishedPopup = () => ({ type: mobileActionTypes.MOBILE_SHOW_PUBLISHED_POPUP });
