/**
 * Created by ivan on 19.11.17.
 */
import React from 'react';
import { connect } from 'react-redux';
import { Scrollbars } from 'react-custom-scrollbars';
import { getArchiveMessages, selectArchiveMessage, deleteArchiveMessages, retrieveArchiveMessages, checkedAllArchiveMessages } from './../../../../actions/archive';
import * as R from 'ramda';
import { MessageItem, MessageFilter} from './components';
import { CheckBox, ConfirmModal } from './../../../../shared-components';
import { Loader } from './../../../../components';
import { getTranslate } from 'react-localize-redux';

const DELETE_CONFIRM = 'Are you sure you want to delete this slides?';
const RETRIEVE_CONFIRM = 'Are you sure you want to retrieve this slides?';


class ArchiveMessageList extends React.Component {

	constructor(props) {
		super(props);

		this.state = { deleteConfirm: false, retrieveConfirm: false };

		this.selectMessage = this.selectMessage.bind(this);
		this.deleteMessages = this.deleteMessages.bind(this);
		this.checkAllMessages = this.checkAllMessages.bind(this);
		this.renderMessagesCounter = this.renderMessagesCounter.bind(this);
		this.retrieveMessages = this.retrieveMessages.bind(this);
		this.cancelConfirmModal = this.cancelConfirmModal.bind(this);
		this.confirmDeleteMessages = this.confirmDeleteMessages.bind(this);
		this.confirmRetrieveMessages = this.confirmRetrieveMessages.bind(this);
		this.renderDeleteConfirmModal = this.renderDeleteConfirmModal.bind(this);
		this.renderRetrieveConfirmModal = this.renderRetrieveConfirmModal.bind(this);
	}

	componentDidMount() {
		this.props.getArchiveMessages();
	}

	selectMessage(messageId) {
		this.props.selectArchiveMessage(R.head(this.props.messages.filter(messages => messages.Id === messageId)));
	}

	checkAllMessages(checked) {
		this.props.checkedAllArchiveMessages(checked);
	}

	deleteMessages() {
		const { checkedAll } = this.props;
		this.props.deleteArchiveMessages(checkedAll);
		this.cancelConfirmModal();
	}

	retrieveMessages() {
		const { checkedAll } = this.props;
		this.props.retrieveArchiveMessages(checkedAll);
		this.cancelConfirmModal();
	}

	cancelConfirmModal() {
		this.setState({ deleteConfirm: false, retrieveConfirm: false });
	}

	confirmDeleteMessages() {
		this.setState({ deleteConfirm: true });
	}

	confirmRetrieveMessages() {
		this.setState({ retrieveConfirm: true });
	}

	renderDeleteConfirmModal() {
		const { deleteConfirm } = this.state;
		return <ConfirmModal isOpen={deleteConfirm} text={DELETE_CONFIRM} confirm={this.deleteMessages} cancel={this.cancelConfirmModal} />;
	}

	renderRetrieveConfirmModal() {
		const { retrieveConfirm } = this.state;
		return <ConfirmModal isOpen={retrieveConfirm} text={RETRIEVE_CONFIRM} confirm={this.retrieveMessages} cancel={this.cancelConfirmModal} />;
	}

	renderMessagesCounter() {
		const { messages, translate, checkedAll } = this.props;
		const count = messages.filter(messages => !messages.hide);
		const all = (count.length === checkedAll.length) && checkedAll.length !== 0;

		return (
			<div className='d-flex justify-content-start selected-slide-count-block'>
				<CheckBox checked={all} main={true} onClick={this.checkAllMessages} />
				<div>{checkedAll.length > 0 && (<span className='title'>{checkedAll.length}{' '}{translate('SUBTITLE_SELECTED')}</span>)}</div>
			</div>
		)
	}

	render() {
		const { translate, messages, checkedAll, selectedId, loading } = this.props;
		const count = this.props.messages.filter(messages => !messages.hide);

		const _messages = messages.map((message, index) => !message.hide ? (<MessageItem isActive={selectedId === message.Id} message={message} key={index} select={this.selectMessage} />) : null);

		return (
			<div className='card content-template archive-message-list' style={{ height: 'calc(100vh - 100px)' }}>
				<div className='content-template__title'>{translate('TITLE_DSARCHIVE')}
					<span className='content-template__list content-template__list--icons' />
					<MessageFilter translate={translate} />
					{loading && <Loader small={true} />}
					{count.length > 0 && this.renderMessagesCounter()}
					<div className={'content-template-preview content-template-preview--list'}>
							<Scrollbars ref='archive-scrollbars' autoHide autoHideTimeout={500} autoHideDuration={100} style={{ height: 'calc(100vh - 310px)' }} renderThumbVertical={props => <div {...props} className='vertical-scroll'/>} renderView={props => <div {...props} className='scroll-content'/>}>
								<div>
									{  _messages }
									{ !loading && count.length == 0 && (<span className='empty-messages-list'>No results found&nbsp;<i className='fa fa-frown-o icon'/></span>)}
								</div>
							</Scrollbars>
						{checkedAll.length > 0 ?
							(
								<div className='d-flex pt-10'>
									<div className='flex-publish-btn justify-content-end'>
										<button onClick={this.confirmDeleteMessages} type='button' className='btn btn--danger btn--helvetica-bold btn--padding-0 btn--radius-2 btn--slide-size btn--next-btn'>
											<i className='menu-icon icon-trash'/><span>{' '}{translate('BTN_DELETE')}</span>
										</button>&nbsp;&nbsp;&nbsp;
										<button onClick={this.confirmRetrieveMessages} className='btn btn--select btn--select--primary btn-padding' type='button'><i className='menu-icon icon-redo' /><span>{' '}{translate('BTN_RETRIEVE')}</span></button>
									</div>
								</div>
							) : null}
					</div>
				</div>
				{ this.renderDeleteConfirmModal() }
				{ this.renderRetrieveConfirmModal() }
			</div>
		);
	}
}

const select = state => {
	return {
		loading: state.archive.loading,
		messages: state.archive.messages,
		checkedAll: state.archive.checkedAll,
		selectedId: state.archive.selected && state.archive.selected.Id,
		translate: getTranslate(state.locale)
	}
};

export default connect(select, { getArchiveMessages, selectArchiveMessage, deleteArchiveMessages, checkedAllArchiveMessages, retrieveArchiveMessages })(ArchiveMessageList);
