import * as React from 'react';
import { connect } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';
import { storeState } from '../../types/index';
import { LOGIN } from '../../constants/routes';


interface AuthRoutProps {
    token: string,
    path: string,
    component?: any
}

class AuthRout extends React.Component<AuthRoutProps> {

    render() {
        const { component: Component, token, ...rest } = this.props;

        return (
            <Route {...rest} render={(props) => {
                return (
                token
                    ? <Component {...props} />
                    : <Redirect to={LOGIN} />
                )
            }} />
        )
    }
}

const mapStateToProps = (state: storeState): {token: string} => {
    return {
        token: state.auth.user.token
    }
};

export default connect(mapStateToProps)(AuthRout);
