import { combineReducers } from 'redux';
import * as entites from './entities';
import { USER_ROUTER_ID, LOGIN_ROUTER_ID } from '../constants/routers';
import * as ui from './ui';
import { navigation } from './navigation';
const allReducers = [entites, ui];
import { reducer as reduxFormReducer } from 'redux-form';
import * as ActionTypes from '../constants/actions';
import Tabs from '../router';
import Login from '../router/login';
export const allReducerNames = allReducers.reduce((pv, cv) => pv.concat(Object.keys(cv)), []);


const appReducer = combineReducers(Object.assign({
		form: reduxFormReducer,
		userNav: navigation(USER_ROUTER_ID, Tabs.router, 'Main'),
		loginNav: navigation(LOGIN_ROUTER_ID, Login.router, 'Login'),
	},
	...allReducers
));

const initialState = appReducer({}, {});
const rootReducer = (state, action) => {
	if (action.type === ActionTypes.LOGOUT_SUCCESS || action.type === ActionTypes.RESET_APP) {
		state = initialState;
	}

	return appReducer(state, action)
};

export default rootReducer;
