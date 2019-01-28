/**
 * Created by ivan on 19.11.17.
 */
import React from 'react';
import { connect } from 'react-redux';
import classNames from  'classnames';
import { Loader } from './../../../../components';
import { getSystemStatus } from './../../../../actions/system-status';
import { getSystemStatusPlayers } from './../../../../selectors/players';
import moment from 'moment';


class SystemStatusList extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			filterName: '',
			isOpenSearchInput: false,
			filterStatus: { online: true, offline: true }
		};

		this.renderFilters = this.renderFilters.bind(this);
		this.renderList = this.renderList.bind(this);
		this.renderListItem = this.renderListItem.bind(this);
		this.searchFilterOutside = this.searchFilterOutside.bind(this);
		this.openSearchInput = this.openSearchInput.bind(this);
		this.clearSearchInput = this.clearSearchInput.bind(this);
	}

	componentDidMount() {
		this.props.getSystemStatus();
		document.addEventListener('mousedown', this.searchFilterOutside);
	}

	componentWillUnmount() {
		document.removeEventListener('mousedown', this.searchFilterOutside);
	}

	searchFilterOutside(event) {
		if (this.wrapperRef && !this.wrapperRef.contains(event.target))
			this.openSearchInput(false);
	}

	statusFilter(status) {
		this.setState({ filterStatus: {...this.state.filterStatus, ...{[status]: !this.state.filterStatus[status]}} });
	}

	openSearchInput(status) {
		if(this.state.filterName && !status) return;
		this.setState({isOpenSearchInput: status});
	}

	clearSearchInput() {
		this.setState({filterName: ""});
	}

	renderFilters() {
		const { translate, players } = this.props;
		const { filterName, filterStatus: { online, offline }} = this.state;

		return (
			<div className='content-template__filters filters'>
				<div className="filters-search-block" ref={node => this.wrapperRef = node}>
					<span className="content-template__filters__icon" onClick={this.openSearchInput.bind(this, true)}><i className="menu-icon icon-search" /></span>
					<div className={classNames('search-filter', {'search-filter--close': !this.state.isOpenSearchInput})}>
						<input className="search-filter__search-input" onChange={text => {this.setState({filterName: text.target.value});}} value={filterName}/>
						<span className={classNames('search-filter__close-icon', {'search-filter__close-icon--close': !filterName})} onClick={this.clearSearchInput}><i className="menu-icon icon-cross" /></span>
					</div>
				</div>
				<span className="content-template__list content-template__list--statuses">
						<span className={classNames('status', 'status--active', { 'selected': online })} onClick={this.statusFilter.bind(this, 'online')}>{ players.filter((player) => player.IsOnline).length }{' '}{translate('STATUS_ONLINE')}</span>
						<span className={classNames('status', 'status--concept', { 'selected': offline })} onClick={this.statusFilter.bind(this, 'offline')}>{ players.filter((player) => !player.IsOnline).length }{' '}{translate('STATUS_OFFLINE')}</span>
					</span>
			</div>
		);
	}

	renderList() {
		const { translate, players, loading } = this.props;
		const { filterName, filterStatus } = this.state;
<<<<<<< HEAD
		const filterPlayers = players.filter((player) =>
			(((filterStatus['online'] && player.IsOnline) || (filterStatus['offline'] && !player.IsOnline))
			&& (!filterName || player.Name.toLowerCase().indexOf(filterName.toLowerCase()) !== -1)));
=======
		//const filterPlayers = players.filter((player) => (filterStatus[players.IsOnline ? 'online' : 'offline'] && (!filterName || player.Name.toLowerCase().indexOf(filterName.toLowerCase()) !== -1)));

		const filterPlayers = players.filter((player) =>
            (((filterStatus['online'] && player.IsOnline) || (filterStatus['offline'] && !player.IsOnline))
            && (!filterName || player.Name.toLowerCase().indexOf(filterName.toLowerCase()) !== -1)));
>>>>>>> release/release-1.3.9

		return (
			<div>
				<div>
					{ !loading && filterPlayers.length > 0 && (
						<table className='table table-striped system-status-table'>
							<thead>
							<tr>
								<th>{translate('TABLE_SYSTEM_PLAYER')}</th>
								<th/>
								<th>{translate('TABLE_SYSTEM_CONNECTION')}</th>
								<th>{translate('TABLE_SYSTEM_START')}</th>
								<th>{translate('TABLE_SYSTEM_ACTIVATION')}</th>
								<th className='text-center'>{translate('TABLE_SYSTEM_VERSION')}</th>
								<th className='text-center'>{translate('TABLE_SYSTEM_RUNTIME')}</th>
								<th className='text-center'>{translate('TABLE_SYSTEM_IP')}</th>
								<th className='text-center'>{translate('TABLE_SYSTEM_FREESPACE')}</th>
								<th>{translate('TABLE_SYSTEM_OS')}</th>
							</tr>
							</thead>
							<tbody>
							{ filterPlayers.map((player, index) => this.renderListItem(player, index)) }
							</tbody>
						</table>)
					}
					{ !loading && filterPlayers.length == 0 && (<span className='empty-player-list'>No results found&nbsp;<i className='fa fa-frown-o icon'/></span>)}
				</div>
			</div>
		)
	}

	renderListItem(player, key) {
		const { translate } = this.props;
<<<<<<< HEAD
		
=======
		// console.log(player);
>>>>>>> release/release-1.3.9
		return (
			<tr key={key}>
				<th scope="row">{ player.Name }</th>
				<td  className={classNames('text-center', {'green': player.IsOnline}, {'red': !player.IsOnline})}>{ player.OnlineDuration } {player.IsOnline ? translate('STATUS_ONLINE') : translate('STATUS_OFFLINE')}</td>
				<td>{player.LastConnection && moment(player.LastConnection).format('DD/MM/YYYY H:mm')}</td>
				<td>{player.SessionStartedOn && moment(player.SessionStartedOn).format('DD/MM/YYYY H:mm')}</td>
				<td>{player.ActivatedOn && moment(player.ActivatedOn).format('DD/MM/YYYY H:mm')}</td>
				<td className='text-center'>{ player.PlayerVersion }</td>
				<td className='text-center'>{ player.RunrtimeVersion }</td>
				<td className='text-center'>{ player.IPAddress }</td>
				<td  className={classNames('text-center', {'green': player.FreeSpace > 1}, {'red': player.FreeSpace < 1})}>{ player.FreeSpace }</td>
				<td>{ player.OS }</td>
			</tr>
		)
	}

	render() {
		const { loading } = this.props;

		return (
			<div>
				{ this.renderFilters() }
				{ loading && <Loader margin={'15% auto'} /> }
				{ !loading && this.renderList() }
			</div>
		);
	}
}

const select = (state) => {
	return {
		loading: state.systemStatus.loading,
		players: getSystemStatusPlayers(state)
	}
};

export default connect(select, { getSystemStatus })(SystemStatusList);
