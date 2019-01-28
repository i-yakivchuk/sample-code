/**
 * Created by ivan on 28.01.18.
 */
import React from 'react';
import { connect } from 'react-redux';
import classNames from  'classnames';
import { checkedArchiveMessage } from '../../../../../actions/archive';
import { getSlidePreviewImage } from '../../../../../selectors/slides';
import { CheckBox } from './../../../../../shared-components';
import moment from 'moment';
import * as R from 'ramda';


class MessageItem extends React.Component {

	constructor(props) {
		super(props);

		this.checkMessage = this.checkMessage.bind(this);
		this.renderImagePreview = this.renderImagePreview.bind(this);
	}

	checkMessage(checked) {
		const { message: { Id } } = this.props;
		this.props.checkedArchiveMessage({ id: Id, checked: checked });
	}

	renderImagePreview() {
		const { message } = this.props;
		const { imageSrc, isVideoIcon } = getSlidePreviewImage(message);

		return (
			<div className='image-wrapper'>
				<div style={imageSrc ? {backgroundImage: 'url(' + imageSrc + ')'} : {backgroundColor: '#5d7893'}} className='slide-preview-image'></div>
				{ isVideoIcon ? (<span className='image-wrapper__video'><i className='icon menu-icon icon-triangle'/></span>) : null }
			</div>
		);
	}

	render() {
		const { message, isActive, select, checkedAll } = this.props;
		const checked = R.contains(message.Id, checkedAll);

		return (
			<div className='col-md-4 col-sm-5 col-xs-6 preview-block'>
				<div className={classNames('d-flex justify-content-start')}>
					<div className='checkbox-wrapper'><CheckBox checked={checked} onClick={this.checkMessage} /></div>
					<div onClick={() => select(message.Id)} style={{flex: 1, cursor: 'pointer'}} className={classNames('d-flex justify-content-start list', {'preview-block-select-active': isActive})}>
						<div>{this.renderImagePreview()}</div>
						<div className='p-2 align-self-center'><p className='card-title__text'>{message.Name}</p></div>
						<div className='ml-auto p-2 align-self-center message-date'>{moment(message.EndOn).format('DD-MM-YYYY')}</div>
						<hr className='card__hr'/>
					</div>
				</div>
			</div>
		);
	}
}

const select = (state) => {
	return {
		checkedAll: state.archive.checkedAll
	}
};

export default connect(select, { checkedArchiveMessage })(MessageItem);
