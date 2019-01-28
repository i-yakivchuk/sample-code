import * as React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { ROOT, LOGOUT } from '../constants/routes';
import { Header, Logout } from '../components';
import { Home } from '../containers';


class MainLayout extends React.Component<any, any> {

    render() {
        return (
            <div>
                <Header />
                <Switch>
                    <Route exact path={ROOT} component={Home} />
                    <Route exact path={LOGOUT} component={Logout} />
                    <Redirect to={ROOT} />
                </Switch>
            </div>
        )
    }
}

export default MainLayout;
