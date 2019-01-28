import * as React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { AUTH_PREFIX, ROOT } from './constants/routes';

import {
    AuthRoute
} from './components';

import {
    MainLayout,
    UnauthorizedLayout
} from './layouts';


const App = () => {

  return (
    <Switch>
      <Route path={AUTH_PREFIX} component={UnauthorizedLayout} />
      <AuthRoute path={ROOT} component={MainLayout} />
      <Redirect to={ROOT} />
    </Switch>
  )

};

export default App;
