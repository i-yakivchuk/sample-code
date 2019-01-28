import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { localeReducer as locale } from 'react-localize-redux';
import { reducer as formReducer } from 'redux-form';
import { reducer as notifications } from 'react-notification-system-redux';
import {
	users
} from  './reducers/users';

import { swf } from './reducers/swf';
import { slides } from './reducers/slides';
import { authors } from './reducers/authors';
import { categories } from './reducers/categories';
import { archive } from './reducers/archive';
import { players } from './reducers/players';
import { tags } from './reducers/tags';
import { systemStatus } from './reducers/system-status';
import { mobile } from './reducers/mobile';
import { playlists } from './reducers/playlists';
import { playerPreview } from './reducers/player-preview';
import settings from './reducers/settings';

export default combineReducers({
	locale,
	user: users,
	router: routerReducer,
	form: formReducer,
	swf: swf,
	slides,
	authors,
	categories,
  players,
  tags,
	notifications,
	archive,
	systemStatus,
	mobile,
  playlists,
	playerPreview,
	settings
});
