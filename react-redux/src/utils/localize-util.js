/**
 * Created by ivan on 08.04.18.
 */
import { initialize, getActiveLanguage, setActiveLanguage, addTranslationForLanguage } from 'react-localize-redux';
import { store } from './../redux/store';
import CONFIG from './../config';

const DEFAULT_CODE = 'en';
const DEFAULT_LANGUAGES = [
	{ name: 'English', code: 'en' },
	{ name: 'Dutch', code: 'nl' },
	{ name: 'German', code: 'de' }
];

const setDefaultLanguages = (lng) => {
	store.dispatch(initialize(DEFAULT_LANGUAGES, { defaultLanguage: lng }));
	setLanguages(lng);
};

// todo on the target server querying on non allowed urls gives an error
const isLngUrlExists = (url) => {
	const http = new XMLHttpRequest();
	http.open('HEAD', url, false);
	http.send();

	return http.status !== 404;
};

// todo apart from using setlanuages before defined in prod the variable
// config.project_url will have (probably) and invalid value because it 
// is pre-build. After build a PROJECT URL of e.g. /something/ can be set
// which is the correct target uri
const setLanguages = (lng) => {
	
	let lngUrl = window.env.PROJECT_URL + '/locales/'  + lng + '.json';

    //let lngUrl = `${CONFIG.PROJECT_URL}/locales/${lng}.json`;

	if (!isLngUrlExists(lngUrl)) {
		lngUrl = `${CONFIG.PROJECT_URL}/locales/en.json`;
	}

	fetch(lngUrl)
		.then( (response) => {
			return response.json()
		})
		.then((json) => {
			store.dispatch(setActiveLanguage(lng));
			store.dispatch(addTranslationForLanguage(json, lng));
		});
};

const getLanguages = () => {
	return DEFAULT_LANGUAGES;
};

const getActiveLanguageCode = () => {
	return getActiveLanguage(store.getState().locale).code;
};

const getLanguageCodeForUrl = () => {
	const defaultLng = getActiveLanguage(store.getState().locale).code;

	return defaultLng === DEFAULT_CODE ? '' : (defaultLng + '/');
};

const localize = {
	getLanguageCodeForUrl,
	getActiveLanguageCode,
	setDefaultLanguages,
	getLanguages,
	setLanguages
};

export default localize;
