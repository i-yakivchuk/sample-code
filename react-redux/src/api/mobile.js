/**
 * Created by ivan on 06.03.18.
 */
import Api from './api';
const path = '/Mobile';

export function getMoblieMessages(customerId) {
	return Api.get(`${path}/GetMobileMessages?customerId=${customerId}`, {credentials: "sso"});
}

export function getMobileMessageById(id) {
	return Api.get(`/Message/GetMessagesById/${id}`, {credentials: "sso"});
}

export function deleteMobileMessage(messageId) {
	return Api.delete(`${path}/DeleteMessage?messageId=${messageId}`, {credentials: "sso"});
}

export function saveMobileMessage(params, customerId) {
	return Api.post(`${path}/SaveMessage?customerId=${customerId}`, params, {credentials: "sso"});
}

export function saveMobileUserMessageTags(params, customerId) {
	return Api.post(`${path}/SaveMobileUserMessageTags?customerId=${customerId}`, params, {credentials: "sso"});
}

export function uploadMobileMessageImage(params) {
	return Api.post(`/Message/UploadImage`, params, {credentials: "sso"});
}

export function uploadVideoMobileMessage(params, config) {
	return Api.post(`/Message/UploadVideo`, params, {...config, credentials: "sso"});
}

export function getRawMobileMessageAttachment(rawMessageAttachmentId) {
	return Api.get(`/Message/GetRawMessageAttachment/${rawMessageAttachmentId}`, {credentials: "sso"});
}

export function getMobileMessageUsers(messageId) {
	return Api.get(`${path}/GetMobileUsersAndTagsByMessage?messageId=${messageId}`, {credentials: "sso"});
}
