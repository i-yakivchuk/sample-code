import * as React from 'react';
import { connect } from 'react-redux';
import { Route, Switch, Redirect } from 'react-router-dom';
import { storeState } from '../types/index';
import { ROOT, LOGIN, SIGN_UP } from '../constants/routes';
import { Login, SignUp } from '../containers';


interface UnauthorizedLayoutProps {
    token: string
}

class UnauthorizedLayout extends React.Component<UnauthorizedLayoutProps> {

    render() {
        if (!this.props.token) {
            return (
                <div className="container-fluid">
                    <div className="d-flex flex-column justify-content-center align-items-center auth-form-center">
                        <div className="col-xl-3 col-lg-4 col-md-5 col-sm-6 col-9">
                            <div className="row">
                                <div className="col-12" id="login-page-logo"></div>
                            </div>
                            <Switch>
                                <Route path={LOGIN} component={Login} />
                                <Route path={SIGN_UP} component={SignUp} />
                                <Redirect to={LOGIN} />
                            </Switch>
                        </div>
                    </div>
                </div>
            )
        } else {
            return <Redirect to={ROOT} />
        }
    }
}

const mapStateToProps = (state: storeState): {token: string} => {
    return {
        token: state.auth.user.token
    }
}

export default connect(mapStateToProps)(UnauthorizedLayout)
