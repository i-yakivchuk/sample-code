import React from 'react';
import {connect} from 'react-redux';
import {slides, slidesSuccess, slidesError, setActiveSlide, addNewSlide} from '../../../../actions/slides';
import { getMobileMessages, selectMobileMessage } from '../../../../actions/mobile';
import {authors, authorsSuccess, authorsError} from '../../../../actions/authors';
import {categories, categoriesSuccess, categoriesError} from '../../../../actions/categories';
import classNames from    'classnames';
import {Scrollbars} from 'react-custom-scrollbars';
import { Loader } from './../../../../components';
import { MobileMessageListItem, ControlButtons, MobileMessageFilters } from './components';
import { getTranslate } from 'react-localize-redux';


class MobileMessageList extends React.Component {

	constructor(props) {
		super(props);

		this.renderList = this.renderList.bind(this);
		this.selectMessage = this.selectMessage.bind(this);
		this.renderListItem = this.renderListItem.bind(this);
	}

	componentDidMount() {
		this.props.getMobileMessages();
	}

	selectMessage(message) {
		this.props.selectMobileMessage(message);
	}

	renderListItem(message, key) {
		return (<MobileMessageListItem onMessageSelect={this.selectMessage} slide={message} key={key} />);
	}

	renderList() {
		const { translate, messages, selectedMessage, loading } = this.props;
		const isNewMessage = (selectedMessage && typeof selectedMessage !== 'undefined' && selectedMessage.Id == 0);
		const _messages = messages.filter((item) => !item.hide);

		return (
			<div className='mobile-message-list-wrap'>
				<div className={classNames('mobile-message-preview content-template-preview--list')}>
					<Scrollbars autoHide autoHideTimeout={500} autoHideDuration={100} className='mobile-message-preview__scroll-area'
										renderThumbVertical={props => <div {...props} className="vertical-scroll"/>}
										renderView={props => <div {...props} className="scroll-content"/>}>
						{ isNewMessage && (<MobileMessageListItem slide={selectedMessage} />)}
						{ _messages.map((item, index) => this.renderListItem(item, index)) }
						{ !isNewMessage && !loading && _messages.length == 0 && (
							<span className='empty-result-list'>No results found&nbsp;<i className='fa fa-frown-o icon'/></span>
						)}
					</Scrollbars>
					<div className='gradientback' />
				</div>
				<ControlButtons translate={translate} />
			</div>
		);
	}

	render() {
		const { loading, translate } = this.props;

		return (
			<div className="mobile-message-list card content-template">
				<div className="content-template__title">{translate('TITLE_APPMESSAGEOVERVIEW')}</div>
				<MobileMessageFilters translate={translate} />
				{ loading && <Loader margin={'25% auto'} /> }
				{ !loading && this.renderList() }
			</div>
		);
	}
}

const select = state => {
	return {
		loading: state.mobile.loading,
		messages: state.mobile.messages,
		selectedMessage: state.mobile.selectedMessage,
		translate: getTranslate(state.locale)
	}
};

export default connect(select, { getMobileMessages, selectMobileMessage,
	slides, slidesSuccess, slidesError, addNewSlide, setActiveSlide, authors,
	authorsSuccess, authorsError, categories, categoriesSuccess, categoriesError
})(MobileMessageList);
