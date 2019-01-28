/**
 * Created by ivan on 07.06.18.
 */
import { denormalize } from 'normalizr';
import { contactsSchema, usersSchema, conversationsSchema } from '../normalizr'
import R from 'ramda';
import { getCurrent } from '../selectors/users';
import { getSelectedConversation } from '../selectors/chat';
import { getContact } from '../selectors/contacts';
import { createSelector } from 'reselect';

const denormalizeContacts = (ids, entities) => denormalize(ids, [contactsSchema], entities);
const resultSelector = (ids, entities) => R.compose(denormalizeContacts)(ids, entities);
const createContactsReselector = (idsSelector) => createSelector(idsSelector, state => state.entities, resultSelector);

export const getSelectedContact = R.compose(R.head, createContactsReselector(state => [state.ui.talks.selectedContact]));
export const getMessageToken = (state) => (state.ui.app.encryptMessageToken);
export const getConversationsList = (state) => state.ui.talks.list;


const denormalizeConversations = (ids, entities) => denormalize(ids, [conversationsSchema], entities);
const resultConversationsSelector = (ids, entities) => R.compose(denormalizeConversations)(ids, entities);
const createConversationsReselector = (idsSelector) => createSelector(idsSelector, state => state.entities,  resultConversationsSelector);
export const getUserConversations = createConversationsReselector(state => state.ui.talks.list);

export const getUserConversationsList = (state) => {
	const conversations = getUserConversations(state);
	const user = getCurrent(state);

	const _list = conversations.map((item) => {
		const participant = R.head(item.participants.filter((_item) => _item.id !== user.id));
		const contact = participant || user;

		return Object.assign({}, item, { contact: contact });
	});

	return _list.sort(conversationDescSort);
};

export const conversationDescSort = (obj1, obj2) => {
	if (!obj1.updatedAt) return 1;
	if (!obj2.updatedAt) return -1;
	const date1 = new Date(obj1.updatedAt);
	const date2 = new Date(obj2.updatedAt);
	if (date1 < date2) return 1;
	if (date1 > date2) return -1;
	return 0;
};

export const getChatParticipant = (list, user) => {
	if (!user || !list)
		return [];

	const _list = list.map((item) => {
		const participant = R.head(item.participants.filter((_item) => _item.id !== user.id));
		return Object.assign({}, item, { contact: participant });
	});

	return _list;
};

export const getTypingUsers = (state, props) => {
	const allTyping = state.ui.talks.typing;
	const conversation = props.data || getSelectedConversation(state);

	if (!conversation) return false;

	const typing = R.filter(R.propEq('conversationId', conversation.id))(allTyping);

	if (R.isNil(typing) || R.isEmpty(typing)) return false;

	if (conversation.isDialog) {
		return 'typing'
	} else {
		const participants = conversation.participants;
		let name = '';
		let count = 0;

		typing.map((item) => {
			const user = participants && R.head(participants.filter(participant => participant.id === item.user));

			if (user) {
				if (!name) {
					user && user.first_name ? name = name + user.first_name : null;
					user && user.last_name ? name ? name = name + ' ' + user.last_name : name = name + user.last_name : null;
				} else {
					count++;
				}
			}
		});

		return name ? (count ? name + ' typing and ' + count + ' other' : name + ' typing') : 'typing';
	}
};
