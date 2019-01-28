/**
 * Created by ivan on 23.11.17.
 */
import React from 'react';
import { connect } from 'react-redux';
import Notifications from 'react-notification-system-redux';
import { Switch, Route, Redirect } from 'react-router-dom';
import classNames from  'classnames';
import { getTranslate, getActiveLanguage } from 'react-localize-redux';
import localize from '../../utils/localize-util';


//pages
import {
	Home,
	Archive,
	Mobile,
	PlayerPreview,
	PlaylistScreen,
	SystemStatus,
	Settings,
	PersonalSettings
} from '../../containers';

//page components
import {
	Header,
	SideMenu,
	HamburgerArrow
} from '../../components';
import {CanService} from '../../components/rights'


class MainLayout extends React.Component {

	constructor(props) {
		super(props);
		this.state = { toggle: true };

		this.hideMenu = this.hideMenu.bind(this);
	}

	componentWillReceiveProps(nextProps) {
		const { match } = this.props;

		if (typeof nextProps.match.params['lng'] !== 'undefined' && typeof match.params['lng'] !== 'undefined' && nextProps.match.params && (this.props.activeLng !== nextProps.match.params['lng'])) {
			let lng = localize.getLanguages().filter((ln) => ln.code === nextProps.match.params['lng']);

			if (lng && lng.length)
				localize.setLanguages(nextProps.match.params['lng']);
		}
	}

	hideMenu() {
		this.setState({toggle: !this.state.toggle});
	}

	render() {
		const { translate, match, notifications, history } = this.props;

		return (
			<div>
				<main className={classNames('side-menu-container', {' toggle-side-menu': this.state.toggle})}>
					<Header history={history} />
					<HamburgerArrow toggle={this.hideMenu}/>
					<SideMenu />
					<div className='main-header-after'/>
					<Switch>
						<Route path={`/:lng?/${match.path}`} exact component={Home} />
						<Route path={`/:lng?/personal-settings`} exact component={PersonalSettings} />
						<Route path='/:lng?/archive' exact component={Archive} />
						<Route path='/:lng?/player-preview' exact component={PlayerPreview}/>
						{CanService.check(null, [4]) && <Route path='/:lng?/playlist' exact component={PlaylistScreen} />}
						{CanService.check(['allowMobile']) && <Route path='/:lng?/mobile' exact component={Mobile} />}
						{CanService.check(['showAdminPanel'], [4]) && <Route path='/:lng?/system-status' exact component={SystemStatus} />}
						{CanService.check(['showAdminPanel'], [4]) && <Route path='/:lng?/settings/users' exact render={(props)=><Settings {...props} translate={translate} />} />}
						{CanService.check(['showAdminPanel'], [4]) && <Route path='/:lng?/settings/users-groups' exact render={(props)=><Settings {...props} translate={translate} />} />}
						{CanService.check(['showAdminPanel'], [4]) && <Route path='/:lng?/settings/players' exact render={(props)=><Settings {...props} translate={translate} />} />}
						{CanService.check(['showAdminPanel'], [4]) && <Route path='/:lng?/settings/playlist-groups' exact render={(props)=><Settings {...props} translate={translate} />} />}
						{CanService.check(['showAdminPanel'], [4]) && <Route path='/:lng?/settings/categories' exact render={(props)=><Settings {...props} translate={translate} />} />}
						{CanService.check(['showAdminPanel'], [4]) && <Route path='/:lng?/settings/tag-management' exact render={(props)=><Settings {...props} translate={translate} />} />}
						{CanService.check(['showAdminPanel'], [4]) && <Route path='/:lng?/settings/general' exact render={(props)=><Settings {...props} translate={translate} />} />}
						{CanService.check(['showAdminPanel'], [4]) && <Route path='/:lng?/settings/app-users' exact render={(props)=><Settings {...props} translate={translate} />} />}
						{CanService.check(['showAdminPanel'], [4]) && <Route path='/:lng?/settings/user-tags' exact render={(props)=><Settings {...props} translate={translate} />} />}
						<Redirect to={`/`} />
					</Switch>
					<Notifications notifications={notifications} />
				</main>
			</div>
		);
	}
};

const select = (state) => ({
	user: state.user,
	notifications: state.notifications,
	translate: getTranslate(state.locale),
	activeLng: getActiveLanguage(state.locale).code
});

export default connect(select, {})(MainLayout)
