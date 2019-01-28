import { Platform, NativeModules } from 'react-native';
import firebase from "react-native-firebase";
import Variables from '../constants/variables';


/**
 * @function cancelNotification - cancel notification by id
 *
 * @param notificationId - notification id
 */
const cancelNotification = (notificationId) => {
	if (!notificationId) return false;
	firebase.notifications().removeDeliveredNotification(notificationId).catch(err => console.error(err));
};

/**
 * @function showLocalChatNotification - show local notification for new messages
 *
 * @param action - chat info data
 */
const showLocalChatNotification = (action) => {
	const { conversationId, message, from } = action;
	const title = (from.first_name || '') + ' ' + (from.last_name || '');

	if (Platform.OS === 'android') {
		const localNotification = new firebase.notifications.Notification({
			//sound: 'default',
			show_in_foreground: true,
			local: true,
			showWhen: true
		})
			.setNotificationId(conversationId)
			.setTitle(title)
			.setSubtitle('Titus Talk')
			.setData({ 'msgData': JSON.stringify(action) })
			.android.setClickAction('chat-local-notification')
			.android.setColor(Variables.primaryColor)
			.android.setBigText(message)
			.android.setChannelId(conversationId)
			.android.setSmallIcon('ic_launcher')
			.android.setAutoCancel(true)
			.android.setBadgeIconType(firebase.notifications.Android.BadgeIconType.None)
			.android.setPriority(firebase.notifications.Android.Priority.High);

		firebase.notifications().displayNotification(localNotification).catch(err => console.error(err));
	} else {
		const localNotification = new firebase.notifications.Notification({
				content_available: true
			})
				.setNotificationId(conversationId)
				.setTitle(title)
				.setBody(message)
				.setData({ 'msgData': JSON.stringify(action) });
			firebase.notifications()
				.displayNotification(localNotification)
				.catch(err => console.error(err));
	}
};

/**
 * @function updateUnreadConversationCount - update app icon badge for unread conversation count
 *
 * @param count - unread conversation count
 */
const updateUnreadConversationCount = (count = 0) => {
	if (Platform.OS === 'ios') {
		const localNotification = new firebase.notifications.Notification({ content_available: false }).ios.setBadge(count);
		firebase.notifications().displayNotification(localNotification).catch(err => console.error(err));
	}
};

export {
	cancelNotification,
	showLocalChatNotification,
	updateUnreadConversationCount
};
