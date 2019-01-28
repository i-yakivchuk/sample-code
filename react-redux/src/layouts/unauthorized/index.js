/**
 * Created by ivan on 23.11.17.
 */
import React from 'react';
import { connect } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router-dom';
import Notifications from 'react-notification-system-redux';
import { getTranslate, getActiveLanguage } from 'react-localize-redux';
import { loginSuccess } from '../../actions/users';
import localize from '../../utils/localize-util';
import { Login, ForgotPassword } from '../../containers';


class UnauthorizedLayout extends React.Component {

	componentWillMount() {
		const user = JSON.parse(localStorage.getItem('user')) || null;
		if (user) this.props.loginSuccess({data: user});
	}

	componentWillReceiveProps(nextProps) {
		const { history, match } = this.props;

		if (typeof nextProps.match.params['lng'] !== 'undefined' && typeof match.params['lng'] !== 'undefined' && nextProps.match.params && (this.props.activeLng !== nextProps.match.params['lng'])) {
			let lng = localize.getLanguages().filter((ln) => ln.code === nextProps.match.params['lng']);

			if (lng && lng.length) {
				localize.setLanguages(nextProps.match.params['lng']);
			} else {
				history.replace('/auth/login');
				localize.setLanguages('en');
			}
		}

		if (!this.props.user.current && nextProps.user && nextProps.user.current) {
			localStorage.setItem('user', JSON.stringify(nextProps.user.current));
			if (nextProps.location && nextProps.location.pathname) {
				history.push(nextProps.location.pathname);
			} else {
				history.push('/');
			}
		}
	}

	render() {
		const { notifications } = this.props;

		return (
			<div className='unauthorized-layout'>
				<div className='header'>
					<span className='logo'>
						<i className='main-logo-blue'/>
					</span>
				</div>
				<Switch>
					<Route path='/:lng?/auth/login' exact render={(props)=><Login {...props} translate={this.props.translate} />} />
					<Route path='/:lng?/auth/forgot-password' exact render={(props) => <ForgotPassword {...props} translate={this.props.translate} />} />
					<Redirect to='/:lng?/auth/login' />
				</Switch>
				<Notifications notifications={notifications} />
			</div>
		)
	}
};


const select = (state) => ({
	user: state.user,
	location: state.user.location,
	notifications: state.notifications,
	translate: getTranslate(state.locale),
	activeLng: getActiveLanguage(state.locale).code
});

export default connect(select, { loginSuccess })(UnauthorizedLayout)
