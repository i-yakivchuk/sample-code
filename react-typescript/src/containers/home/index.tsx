import * as React from 'react';
import { connect } from 'react-redux';
import { storeState } from '../../types/index';
import { sessionActions } from '../../store/moduls/auth/index';
import { LOGOUT, LOGIN } from '../../constants/routes';
import { Redirect, Link } from 'react-router-dom';
import { userData } from '../../services/old-api';

interface UserPage {
    user: any,
    updateUserData: any,
    deleteUserData: any
}

class UserPage extends React.Component<UserPage, any> {
    constructor(props: any) {
        super(props);
        userData(this.props.user.token, this.props.updateUserData, this.props.deleteUserData);
    }

    render() {
        const { contacts=[], token } = this.props.user;
        if (!token) {
            return <Redirect to={LOGIN} />
        } else {
            return (
                <div>
                    <div>
                        <Link to={LOGOUT}>LogOut</Link>
                    </div>
                    {contacts.map((item: any) => {
                        return (
                            <div>
                                <div>{item.username}</div>
                                <img key={String(item.id)} width="80px" height="90px" src={item.avatar} />
                            </div>
                        )
                    })}
                </div>
            )
        }
    }
}

const mapStateToProps = (state: storeState): {user: any} => {
    return {
        user: state.auth.user
    }
}

const mapDispatchToProps = (dispatch: any): {updateUserData: any, deleteUserData: any} => {
    return {
        updateUserData: (user: any) => dispatch(sessionActions.updateUserData(user)),
        deleteUserData: () => dispatch(sessionActions.deleteUserData())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserPage);
