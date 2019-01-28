/**
 * Created by ivan on 10.03.18.
 */
import { IMAGE_TYPE, VIDEO_TYPE } from '../constants/file-type-validation';
import * as R from 'ramda';


function getExtension(filename) {
	const parts = filename.split('.');
	return parts[parts.length - 1];
}

function isImage(filename) {
	const ext = getExtension(filename);

	if (R.contains(ext.toLowerCase(), IMAGE_TYPE))
		return true;

	return false;
}

function isVideo(filename) {
	const ext = getExtension(filename);

	if (R.contains(ext.toLowerCase(), VIDEO_TYPE))
		return true;

	return false;
}

function getMessageFileValidType(file) {
	if (isImage(file.name))
		return 'image';

	if (isVideo(file.name))
		return 'video';

	return false;
}

function isNotThumbImage(path) {
	const regexStr = /\b(-thumb)\b/g; //check thumb-slide image

	if (!path.match(regexStr))
		return true;

	return false;
}

function getMessageAttachments(image) {
	if (!image)
		return false;

	let id = image.substr(0, image.indexOf('-'));
	let name = image.substr((image.indexOf('-') + 1), image.length).replace('\n','');
	let hash = name.replace('\n','').replace(/\.[^/.]+$/, "");

	return {
		'Id': parseInt(id),
		'Name': name,
		'Hash': hash,
		'Path': name,
		'Description': 'MobileMessageImage',
		'Dirty': true
	}
}


function getRawMessageAttachments(video) {
	if (!video || !video.hashName)
		return false;

	let id = video.hashName.substr(0, video.hashName.indexOf('-'));
	let name = video.hashName.substr((video.hashName.indexOf('-') + 1), video.hashName.length).replace('\n','');
	let hash = name.replace('\n','').replace(/\.[^/.]+$/, "");
	name = video.name || name;

	return {
		Id: 0,
		Attachment: {
			Id: parseInt(id),
			Name: name,
			Description: 'video',
			Hash: hash,
			Path: name,
			Info:  null,
			Dirty: false
		},
		AttachmentProcessState: {
			Id: 1,
			Name: 'New',
			Dirty: false
		},
		Dirty: false
	};
}

const mobile = {
	isImage,
	isVideo,
	getExtension,
	getMessageFileValidType,
	getRawMessageAttachments,
	getMessageAttachments,
	isNotThumbImage
};

export default mobile;
