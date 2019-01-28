import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';
import localize from './utils/localize-util';
import { store } from './redux/store';

//first init and set app default languages
localize.setDefaultLanguages('en');

// AuthRoute
import AuthRoute from './components/auth-route';

// Layouts
import {
  MainLayout,
  UnauthorizedLayout
} from './layouts';

const baseUrl = window.env.PROJECT_URL

const App = props => (
  <Provider store={store}>
        <BrowserRouter basename={baseUrl}>
        <div>
          <Switch>
	          <Route path={'/:lng?/auth'} component={UnauthorizedLayout} />
	          <AuthRoute path="/:lng?/" component={MainLayout} />
	          <Redirect to="/" />
          </Switch>
        </div>
      </BrowserRouter>
  </Provider>
);

ReactDOM.render(<App />, document.getElementById('root'));
