import React from 'react';
import { connect } from 'react-redux';
import { isDirty } from 'redux-form';
import { publishMobileMessage, selectMobileMessage, resetMobileForm, selectNewMessage, deleteMobileMessage } from '../../../../../actions/mobile';
import { ConfirmModal, PublishedModal } from './../../../../../shared-components';
import * as R from 'ramda';


const DELETE_CONFIRM = 'Are you sure you want to delete this message?';
const DISCARD_CONFIRM = 'Are you sure you want to discard this message?';

const mobileMessageContentForm = 'mobile-message-content';
const mobileMessagePublishSettingsForm = 'mobile-message-publish-settings';

class ControlButtons extends React.Component {

  constructor(props) {
    super(props);

    this.state = { deleteConfirm: false, discardConfirm: false };

    this.newMessage = this.newMessage.bind(this);
    this.deleteMessage = this.deleteMessage.bind(this);
    this.discardMessage = this.discardMessage.bind(this);
    this.publishMessage = this.publishMessage.bind(this);
    this.confirmDeleteMessages = this.confirmDeleteMessages.bind(this);
    this.confirmDiscardMessages = this.confirmDiscardMessages.bind(this);
    this.renderDeleteConfirmModal = this.renderDeleteConfirmModal.bind(this);
    this.renderDiscardConfirmModal = this.renderDiscardConfirmModal.bind(this);
  }

	newMessage() {
    this.props.selectNewMessage();
  }

	publishMessage() {
		this.props.publishMobileMessage();
	}

	deleteMessage() {
    const { selectedMessage } = this.props;

    if (selectedMessage && selectedMessage.Id)
		  this.props.deleteMobileMessage(selectedMessage.Id);

    this.setState({ deleteConfirm: false, discardConfirm: false });
	}

	discardMessage() {
		const { resetMobileForm, messages, selectedMessage } = this.props;

		if (selectedMessage && typeof selectedMessage.Id !== 'undefined') {
			resetMobileForm(mobileMessageContentForm);
			resetMobileForm(mobileMessagePublishSettingsForm);

			const _message = messages.filter((item) => !item.hide);
			this.props.selectMobileMessage(_message.length > 0 ? R.head(_message) : {});
		}

		this.setState({ deleteConfirm: false, discardConfirm: false });
	}

	confirmDeleteMessages() {
    this.setState({ deleteConfirm: true });
	}

	confirmDiscardMessages() {
		this.setState({ discardConfirm: true });
	}

	renderDeleteConfirmModal() {
		const { deleteConfirm } = this.state;
		return <ConfirmModal isOpen={deleteConfirm} text={DELETE_CONFIRM} confirm={this.deleteMessage} cancel={ () => this.setState({ deleteConfirm: false, discardConfirm: false })} />;
	}

	renderDiscardConfirmModal() {
		const { discardConfirm } = this.state;
		return <ConfirmModal isOpen={discardConfirm} text={DISCARD_CONFIRM} confirm={this.discardMessage} cancel={ () => this.setState({ deleteConfirm: false, discardConfirm: false })} />;
	}

  renderDefaultBtn() {
	  const { messages, translate } = this.props;
    const _messages = messages.filter((item) => !item.hide);

    return (
      <div className='justify-content-start'>
        <button onClick={this.newMessage} type='button' className='btn btn--create btn--helvetica-bold btn--padding-0 btn--radius-2 btn--slide-size-new-slide'>
          <i className='menu-icon icon-plus'/><span>{' '}{translate('BTN_NEWMESSAGE')}</span>
        </button>
        &nbsp;&nbsp;
	      <button disabled={ _messages.length === 0 } onClick={this.confirmDeleteMessages}  type='button' className='btn btn--danger btn--helvetica-bold btn--padding-0 btn--radius-2 btn--slide-size-delete btn--next-btn'>
		      <i className='menu-icon icon-trash'/><span>{' '}{translate('BTN_DELETE')}</span>
	      </button>
      </div>
    );
  }

  renderPublishBtn() {
  	const { submitting, translate } = this.props;

    return (
      <div className='flex-publish-btn justify-content-end'>
        <button onClick={this.confirmDiscardMessages} disabled={submitting} className='btn btn--select btn--select--primary' type='button'><span>{translate('BTN_DISCARD')}</span></button>
        &nbsp;&nbsp;&nbsp;
        <button onClick={this.publishMessage} disabled={submitting} className='btn btn--primary btn--select btn--text-white btn--default-600' type='button'><i className='fa fa-paper-plane-o'/>&nbsp;&nbsp;<span>{translate('BTN_PUBLISH')}</span></button>
      </div>
    );
  }

  render() {
    const { selectedMessage, isContentInputFormDirty, isPublishSettingsFormDirty, isShowPublishedPopup, submitting } = this.props;
    const isNewMessage = selectedMessage && typeof selectedMessage !== 'undefined' && selectedMessage.Id === 0;
    const showPublishBtn =  isNewMessage || isContentInputFormDirty || isPublishSettingsFormDirty;

    return (
      <div>
        <div className='d-flex'>
          { showPublishBtn ? this.renderPublishBtn() : this.renderDefaultBtn() }
        </div>
	      { this.renderDeleteConfirmModal() }
        { this.renderDiscardConfirmModal() }
	      <PublishedModal isOpen={isShowPublishedPopup} text='Published' />
	      { submitting ? (<div className='disable-screen-action-wrapper'></div>) : null}
      </div>
    );
  }
}


const select = state => {
  return {
	  submitting: state.mobile.submitting,
    messages: state.mobile.messages,
	  isShowPublishedPopup: state.mobile.showPublishedPopup,
    isContentInputFormDirty: isDirty(mobileMessageContentForm)(state),
    isPublishSettingsFormDirty: isDirty(mobileMessagePublishSettingsForm)(state),
    selectedMessage: state.mobile.selectedMessage
  }
};


export default connect(select, { publishMobileMessage, selectMobileMessage, resetMobileForm, selectNewMessage, deleteMobileMessage })(ControlButtons);
