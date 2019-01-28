/**
 * Created by ivan on 19.11.17.
 */
import React from 'react';
import { connect } from 'react-redux';
import { selectNextPlayer, selectPreviewPlayer } from '../../../../actions/player-preview';
import ReactResizeDetector from 'react-resize-detector';


class PlayerIframe extends React.Component {

	constructor(props) {
		super(props);

		this.state = { width: 310, height: 175 }; //default size img template preview
		this.selectNextPlayer = this.selectNextPlayer.bind(this);
		this.onChangeKeyboard = this.onChangeKeyboard.bind(this);
		this.selectPreviewPlayer = this.selectPreviewPlayer.bind(this);
		this.renderPlayerPreviewIframe = this.renderPlayerPreviewIframe.bind(this);

		document.addEventListener('keydown', this.onChangeKeyboard);
	}

	componentWillUnmount() {
		document.removeEventListener('keydown', this.onChangeKeyboard);
	}

	onChangeKeyboard(event) {
		let e = event || window.event;

		if (e.keyCode == '37') {
			this.selectPreviewPlayer();
		} else if (e.keyCode == '39') {
			this.selectNextPlayer();
		}
	}

	selectNextPlayer() {
		this.props.selectNextPlayer();
	}

	selectPreviewPlayer() {
		this.props.selectPreviewPlayer();
	}

	_onResize = (width) => { //resize block
		//width = width - 90;//for arrow

		const rotation = this.state.width / width;
		const height = this.state.height / rotation;
		this.setState({ height: height, width: width});
	}

	renderPlayerPreviewIframe() {
		const { width, height } = this.state;
		const { selectedPlayer } = this.props;

		return (
			<div className='d-flex justify-content-center'>
				{/*<div onClick={this.selectPreviewPlayer} className='align-self-center player-preview-arrow left-arrow'>*/}
					{/*<i className='fa fa-angle-left' />*/}
				{/*</div>*/}
				<div style={{width: '100%', display: 'flex', flexDirection: 'column' }}>
					<iframe className='align-self-stretch' style={width && height && {width: width, height: height}} src={ selectedPlayer.PlayerPreviewSrcLink } />
					{/*<div className='d-flex justify-content-between player-preview-info'>*/}
					{/*<span className='slide-title'>Message 'MediaMyne for Internal Communications' by John Doe</span>*/}
					{/*<span className='slide-title'>Playlist: My Playlist</span>*/}
					{/*</div>*/}
				</div>
				{/*<div onClick={this.selectNextPlayer}  className='align-self-center player-preview-arrow right-arrow'>*/}
					{/*<i className='fa fa-angle-right' />*/}
				{/*</div>*/}
			</div>
		);
	}

	render() {
		const { loading } = this.props;

		return (
			<div className='player-preview-block'>
				<ReactResizeDetector handleWidth handleHeight onResize={this._onResize} />
				{ !loading ? this.renderPlayerPreviewIframe() : null }
			</div>
		);
	}
}

const select = (state) => {
	return {
		loading: state.playerPreview.loading,
		selectedPlayer: state.playerPreview.selected
	}
};

export default connect(select, { selectNextPlayer, selectPreviewPlayer })(PlayerIframe);
