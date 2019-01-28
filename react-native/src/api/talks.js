/**
 * Created by ivan on 08.06.18.
 */
import request from './request';

export function getConversations(page = 1) {
	return request.get('conversation', { page: page });
}

export function getRecipientConversation(conversationId, page = 1) {
	return request.get(`conversation/${conversationId}/history`, { page: page });
}

export function createConversation(participant) {
	return request.post(`conversation/dialog`, { participant });
}

export function createConversationGroup({ title, participants }) {
	return request.post(`conversation`, { title, participants });
}

export function renameConversationGroup(conversationId, title) {
	return request.post(`conversation/${conversationId}`, { title });
}

export function leaveConversationGroup(conversationId) {
	return request.delete(`conversation/${conversationId}/leave`);
}

export function addParticipantsToConversationGroup(conversationId, participants) {
	return request.put(`conversation/${conversationId}/participants`, { participants });
}

export function deleteParticipantFromConversationGroup(conversationId, participants) {
	return request.delete(`conversation/${conversationId}/participants`, { participants });
}

export function getConversationUnreadCount() {
	return request.get(`conversation/unread`);
}

export function getStickerPacks() {
	return request.get(`sticker`);
}

export function getStickerPack(id) {
	return request.get(`sticker/${id}`);
}

export function createFileAttachment({ conversationId, name }) {
	return request.post(`file`, { conversationId, name });
}

export function uploadFileAttachment(params) {
	return request.uploadFile(`file/upload`, params);
}
