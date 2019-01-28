/**
 * Created by ivan on 28.01.18.
 */
import React from 'react';
import { connect } from 'react-redux';
import ReactResizeDetector from 'react-resize-detector';
import { getMessagePreviewImage } from '../../../../selectors/slides';
import moment from 'moment';
import { getTranslate } from 'react-localize-redux';


class ArchiveMessagePreview extends React.Component {

	constructor(props) {
		super(props);

		this.state = { width: 310, height: 175 }; //default size img template preview

		this.renderImagePreview = this.renderImagePreview.bind(this);
		this.renderPlayersNumber = this.renderPlayersNumber.bind(this);
	}

	renderImagePreview() {
		const { width, height } = this.state;
		const { selected } = this.props;
		const imageSrc  = getMessagePreviewImage(selected);
		return imageSrc
			? (<div style={width && height && {width: width, height: height, backgroundImage: 'url(' + imageSrc + ')' }} className='image-preview'  />)
			: (<div><div className='image-error'><i className='fa fa-exclamation-triangle' />&nbsp;&nbsp;Preview image not found!</div></div>);
	}

	renderPlayersNumber() {
		const { selected } = this.props;
		const n = selected && selected.PlayerIds ? selected.PlayerIds.length : false;
		return ( n ? this.props.translate('LABEL_ARCHIVE_STATUSDESCRIPTION1') + ' '+ n  + ' '+ this.props.translate('LABEL_ARCHIVE_STATUSDESCRIPTION2'): 'Not published');
	}

	_onResize = (width) => { //resize swf block
		width = width - 32;
		const rotation = this.state.width / width;
		const height = this.state.height / rotation;
		this.setState({ height: height, width: width});
	}

	render() {
		const { translate, selected, authors } = this.props;
		const author = authors.filter(item => selected && item.Id === selected.CreatedByUserId)[0];

		return (
			<div>
				<ReactResizeDetector handleWidth handleHeight onResize={this._onResize} />
				<div className='card'>
					<div className='archive-message-preview' style={{ height: 'calc(100vh - 102px)' }}>
						{ selected && selected.Id && this.renderImagePreview() }
						{ selected && selected.Id && (
						<div className='fields-block'>
						<div className='d-flex justify-content-start pb-10'>
						<div className='label'>{translate('LABEL_ARCHIVE_NAME')}:</div>
						<div className='value'>{selected.Name}</div>
						</div>
						<div className='d-flex justify-content-start pb-10'>
						<div className='label'>{translate('LABEL_ARCHIVE_SINCE')}:</div>
						<div className='value'>{selected.EndOn && moment(selected.EndOn).format('DD-MM-YYYY')}</div>
						</div>
						<div className='d-flex justify-content-start pb-10'>
						<div className='label'>{translate('LABEL_ARCHIVE_AUTHOR')}:</div>
						<div className='value'>{author ? author.FirstName + ' ' + author.LastName: ''}</div>
						</div>
						<div className='d-flex justify-content-start pt-30 pb-10'>
						<div className='label'>{translate('LABEL_ARCHIVE_CATEGORY')}:</div>
						<div className='value'>{selected.MessageCategory ? selected.MessageCategory.Name : translate('SUBTITLE_NOCATSLIDES')}</div>
						</div>
						<div className='d-flex justify-content-start pb-10'>
						<div className='label'>{translate('LABEL_ARCHIVE_STATUS')}:</div>
						<div className='value'>{this.renderPlayersNumber()}</div>
						</div>
						</div>
					)}
					</div>
				</div>
			</div>
		);
	}
}

const select = state => {
	return {
		selected: state.archive.selected,
		authors: state.authors.filterList,
		translate: getTranslate(state.locale)
	}
};

export default connect(select, {})(ArchiveMessagePreview);
