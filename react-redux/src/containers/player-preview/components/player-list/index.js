/**
 * Created by ivan on 24.03.18.
 */
import React from 'react';
import { connect } from 'react-redux';
import { getPlayers, selectPlayer } from '../../../../actions/player-preview';
import { Scrollbars } from 'react-custom-scrollbars';
import classNames from  'classnames';


class PlayerList extends React.Component {

	constructor(props) {
		super(props);

		this.renderList = this.renderList.bind(this);
		this.selectPlayer = this.selectPlayer.bind(this);
	}

	componentDidMount() {
		this.props.getPlayers();
	}

	selectPlayer(player) {
		this.props.selectPlayer(player);
	}

	renderList() {
		const { translate, players, selectedPlayer } = this.props;

		return (
			<div className='player-preview-list'>
				<div className='title'>{translate('SUBTITLE_PLAYLISTPREVIEW')}</div>
				<Scrollbars autoHide autoHideTimeout={500} autoHideDuration={100} style={{ height: 'calc(100vh - 310px)' }} renderThumbVertical={props => <div {...props} className="vertical-scroll"/>} renderView={props => <div {...props} className="scroll-content"/>}>
					{
						players.map((playerObj, index) => (
							<div onClick={(e) => this.selectPlayer(playerObj) } key={index} className={classNames('player-item', {'active' : playerObj.Id == selectedPlayer.Id})}>
								<i className='menu-icon icon-player-grey'/>
								<span className='name'>{playerObj.Name}</span>
							</div>
						))
					}
				</Scrollbars>
			</div>
		);
	}

	render() {
		const { loading } = this.props;

		return (
			<div className='player-preview-list-block'>
				{ !loading && this.renderList() }
			</div>
		);
	}
}

const select = (state) => {
	return {
		loading: state.playerPreview.loading,
		players: state.playerPreview.list,
		selectedPlayer: state.playerPreview.selected
	}
};

export default connect(select, {  getPlayers, selectPlayer })(PlayerList);
