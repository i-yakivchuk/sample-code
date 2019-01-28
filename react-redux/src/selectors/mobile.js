/**
 * Created by ivan on 07.03.18.
 */
import { parseString } from 'xml2js';
import { getFormValues } from 'redux-form';
import mobile from '../models/mobile';
import * as R from 'ramda';
import { getImageFile, getMediaFileByName, getVideoFile } from '../api/urls';


export const INTRO_VALID_TAGS = ['text', 'tekst', 'intro', 'area', 'bericht', 'subtext', 'tekst1'];


export const getMobileMessagePublishSettings = (state) => {
	if (!state.mobile.selectedMessage) return {};

	const { Name, StartOn, EndOn, IsPublished } = state.mobile.selectedMessage;
	const Users = state.mobile.selectedMessageUsers || null;

	return { Name, StartOn, IsPublished, EndOn, Users };
};


export const getMobileMessageThumb = (message) => {
	let imageSrc = false;
	let isVideoIcon = message.MessageCategory && message.MessageCategory.IconId === 5;

	if (message && message.Attachments && R.head(message.Attachments)) {
		const image = message.Attachments[0];
		let imageFormat = (() => { let nameSplit = image.Path.split("."); return '.' + nameSplit[nameSplit.length-1]; })();

		if (imageFormat === '.mp4') {
			isVideoIcon = true;
			imageSrc = getMediaFileByName(image.Id + '-' + image.Hash + '-thumb.jpg');
		}

		const snapShotAttachments = R.head(message.Attachments.filter((item) => ((mobile.isImage(item.Name) || mobile.isImage(item.Path)) && mobile.isNotThumbImage(item.Path))));
		if (snapShotAttachments)
			imageSrc = getMediaFileByName(snapShotAttachments.Id + '-' + snapShotAttachments.Hash + imageFormat);
	}

	return { imageSrc, isVideoIcon };
};


export const getMobileMessageContent = (state) => {
	const message = state.mobile.selectedMessage;
	let content = {};

	if (!message) return {};
	if (message.Text) {
		parseString(message.Text, (e, result) => {
			if (result && result.data) {
				Object.keys(result.data).map(function(key, index) {
					if (key.toLowerCase() === 'title') content = Object.assign({}, content, {Title: result.data[key][0] });
					if (key.toLowerCase() === 'message') content = Object.assign({}, content, {Message: result.data[key][0] });
					if (R.contains(key.toLowerCase(), INTRO_VALID_TAGS)) content = Object.assign({}, content, {Intro: content.Intro ? content.Intro + '\n'+ result.data[key][0] : result.data[key][0] });
				});
			}
		});
	}

	//get attachment file
	if (message && message.Attachments && R.head(message.Attachments)) {
		let attachment = R.head(message.Attachments);
		const attachmentFormat = mobile.getExtension(attachment.Path);

		if ((mobile.isImage(attachment.Name) || mobile.isImage(attachment.Path)) && (mobile.isNotThumbImage(attachment.Path))) {
			const imageUrl = getImageFile(attachment.Id + '-' + attachment.Hash + '.' + attachmentFormat);
			content = Object.assign({}, content, {ImageOrVideo: Object.assign({}, attachment, { messageFileType: 'image', name: attachment.Path, url: imageUrl })});
		}


		if (mobile.isVideo(attachment.Name) || mobile.isVideo(attachment.Path)) {
			const videoUrl = getMediaFileByName(attachment.Id + '-' + attachment.Hash + '.' + attachmentFormat);
			content = Object.assign({}, content, {ImageOrVideo: Object.assign({}, attachment, { messageFileType: 'video', name: attachment.Name, url: videoUrl })});
		}
	}

	return content;
};


export const getMobileMessageUsers = (state) => {
	if (!state.mobile.selectedMessage || typeof state.mobile.selectedMessage.Id === 'undefined') return {};

	const messageId = state.mobile.selectedMessage.Id;
	const settings = getFormValues('mobile-message-publish-settings')(state);
	const mobileUsers = settings['Users'];

	if (!mobileUsers) return {};

	//get ids for check selected users
	const jobIds = mobileUsers['Jobs'] && mobileUsers['Jobs'].filter(item => item.Selected).map(item => item.Id);
	const departmentIds = mobileUsers['Departments'] && mobileUsers['Departments'].filter(item => item.Selected).map(item => item.Id);
	const companyIds = mobileUsers['Companies'] && mobileUsers['Companies'].filter(item => item.Selected).map(item => item.Id);

	mobileUsers['Users'] && mobileUsers['Users'].map((item) => { // check user active
		item.Active = R.contains(item.JobId, jobIds) && R.contains(item.DepartmentId, departmentIds) && R.contains(item.CompanyId, companyIds);
	});

	mobileUsers['Users'] && ['Users'].sort(function(x, y) { return y.Active - x.Active; });

	return mobileUsers;
};