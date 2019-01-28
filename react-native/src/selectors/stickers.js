import config from '../../config';

export const getBaseUrl = (state) => {
	const baseStickersUrl = state.ui.stickers.baseUrl;
	const apiUrl = config.api.endpoint;

	return `${apiUrl}${baseStickersUrl}`;
};
