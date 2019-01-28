import R from "ramda";

/**
 * @function getConversationName - get conversation name for talks screen
 *
 * @param data - conversation
 * @param userId - current user id
 * @returns {string} - conversation name
 */
export const getConversationName = (data, userId) => {
	let name = '';

	if (data.isDialog) {
		const participant = data.participants && R.head(data.participants.filter(item => item.id !== userId));
		const user = participant || data.owner;

		user && user.first_name ? name = name + user.first_name : null;
		user && user.last_name ? name ? name = name + ' ' + user.last_name : name = name + user.last_name : null;
	} else {
		data.title ? name = data.title : null;
	}

	return name ? name : 'Unknown name';
};

/**
 * @function getConversationAvatar - get conversation avatar for talks screen
 *
 * @param data - conversation
 * @param userId - current user id
 * @returns {{isAvatar: boolean, value: string}}
 */
export const getConversationAvatar = (data, userId) => {
	let avatar = { isAvatar: false, value: 'UN' };

	if (data.isDialog) {
		const participant = data.participants && R.head(data.participants.filter(item => item.id !== userId));
		const user = participant || data.owner;

		if (user.avatar) {
			avatar.isAvatar = true;
			avatar.value = user.avatar;
		} else {
			avatar.isAvatar = false;
			avatar.value = ((user && user.first_name ? user.first_name.charAt(0).toLocaleUpperCase() : '') + (user && user.last_name ? user.last_name.charAt(0).toLocaleUpperCase() : ''));
		}
	} else {
		if (data.title) {
			avatar.value = data.title.charAt(0).toLocaleUpperCase();
		}
	}

	return avatar;
};

/**
 * @function getLastMessageAuthor - get last message author name for conversation
 *
 * @param data - conversation
 * @param userId - current user id
 * @returns {any} - name
 */
export const getLastMessageAuthor = (data, userId) => {
	let name = '';

	if (!data.isDialog) {
		if (data.lastMessage && data.lastMessage.author && data.lastMessage.author !== userId) {
			const user = data.participants && R.head(data.participants.filter(item => item.id === data.lastMessage.author));

			if (user) {
				user && user.first_name ? name = name + user.first_name : null;
				user && user.last_name ? name ? name = name + ' ' + user.last_name : name = name + user.last_name : null;
			}
		} else if (data.lastMessage && data.lastMessage.author && data.lastMessage.author === userId) {
			name = 'You';
		}
	}

	return name;
};
