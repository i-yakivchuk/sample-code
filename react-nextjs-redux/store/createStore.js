import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';
import { reducer as formReducer } from 'redux-form';
import promiseMiddleware from './middleware/redux-promise';

import { store as appStore, middleware as appMiddleware } from './modules/App';
import { store as homeStore } from './modules/Home';
import { store as authStore, middleware as authMiddleware } from './modules/Auth';
import { store as propertiesStore, middleware as propertiesMiddleware } from './modules/Properties';
import { store as contactStore } from './modules/Contact';
import { store as modalStore } from './modules/Modal';
import { store as crudStore } from './modules/Crud';
import { store as adminStore, middleware as adminMiddleware } from './modules/Admin';
import { store as blogStore, middleware as blogMiddleware } from './modules/Blog';
import { store as agentStore, middleware as agentMiddleware } from './modules/Agent';
import { store as membershipStore } from './modules/Memberships';
import { store as uploadStore, middleware as uploaderMiddleware } from './modules/Uploader';
import { store as enquiryStore } from './modules/Enquiry';
import { store as competitionStore, middleware as competitionMiddleware } from './modules/Competition';
import { store as wishlistStore, middleware as wishlistMiddleware } from './modules/Wishlist';
import { store as investmentStore } from './modules/Investment';

const reducers = {
    crudStore,
    appStore,
    homeStore,
    authStore,
    contactStore,
    propertiesStore,
    modalStore,
    adminStore,
    blogStore,
    agentStore,
    membershipStore,
    uploadStore,
    enquiryStore,
    competitionStore,
    wishlistStore,
    investmentStore,
    form: formReducer,
};

const middleware = [
    appMiddleware,
    ...authMiddleware,
    propertiesMiddleware,
    uploaderMiddleware,
    blogMiddleware,
    adminMiddleware,
    agentMiddleware,
    competitionMiddleware,
    ...wishlistMiddleware,
];

if (process.env.NODE_ENV === `development`) {
		const { logger } = require(`redux-logger`);

		//middleware.push(logger);
}

export default initialState => (
    createStore(
        combineReducers({ ...reducers }),
        initialState,
        composeWithDevTools(
            applyMiddleware(
                thunkMiddleware,
                promiseMiddleware,
                ...middleware,
            ),
        )
    )
);
