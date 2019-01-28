import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { reduxForm, Field, formValueSelector } from 'redux-form';
import { DialogModal, UploadPercentModal } from '../../../../shared-components';
import { uploadMobileMessageVideo, cancelUploadMobileMessageVideo, closeUploadMobileMessageVideo } from '../../../../actions/mobile';
import mobile from '../../../../models/mobile';
import { getMobileMessageContent } from '../../../../selectors/mobile';
import { getTranslate } from 'react-localize-redux';


class MobileMessageContent extends React.Component {

	constructor(props) {
		super(props);

		this.state = { showValidFileDialogModal: false };

		this.onDeleteMessageFile = this.onDeleteMessageFile.bind(this);
		this.onChangeMessageFile = this.onChangeMessageFile.bind(this);
		this.onCancelUploadVideo = this.onCancelUploadVideo.bind(this);
		this.renderSelectFileBlock = this.renderSelectFileBlock.bind(this);
		this.onDownloadMessageFile = this.onDownloadMessageFile.bind(this);
		this.onOpenMessageFileInput = this.onOpenMessageFileInput.bind(this);
		this.renderUploadVideoModal = this.renderUploadVideoModal.bind(this);
		this.onCloseUploadVideoModal = this.onCloseUploadVideoModal.bind(this);
		this.toggleValidFileDialogModal = this.toggleValidFileDialogModal.bind(this);
		this.renderValidFileDialogModal = this.renderValidFileDialogModal.bind(this);
	}

	onChangeMessageFile(e, input) {
		let file = e.target.files[0];
		const fileType = file && file.name ? mobile.getMessageFileValidType(file) : false;

		if (fileType) {
			file.messageFileType = fileType;

			if (fileType === 'image') {
				file.tmpUrl = URL.createObjectURL(file);
				input.onChange(file);
			}

			if (fileType === 'video') {
				file.tmpUrl = URL.createObjectURL(file);
				this.props.uploadMobileMessageVideo(file);
			}
		} else { //not valid load file
			this.messageFileInput.value = '';
			this.toggleValidFileDialogModal();
		}
	}

	onDownloadMessageFile() {
		const { messageFile } = this.props;

		if (messageFile.url && messageFile.Path) {
			const link = document.createElement('a');
			link.setAttribute('href', messageFile.url);
			link.setAttribute('download', messageFile.Path);
			link.click();
		}
	}

	onDeleteMessageFile() {
		this.messageFileInput.value = '';
		this.props.change('ImageOrVideo', null);
	}

	onOpenMessageFileInput() {
		this.messageFileInput.click();
	}

	toggleValidFileDialogModal() {
		this.setState({ showValidFileDialogModal: !this.state.showValidFileDialogModal });
	}

	onCloseUploadVideoModal() {
		this.messageFileInput.value = '';
		this.props.closeUploadMobileMessageVideo();
	}

	onCancelUploadVideo() {
		this.messageFileInput.value = '';
		this.props.cancelUploadMobileMessageVideo();
	}

	renderValidFileDialogModal() {
		const { showValidFileDialogModal } = this.state;
		return showValidFileDialogModal && (<DialogModal type={0} close={this.toggleValidFileDialogModal}    text={'Please select a valid image or video!'} />);
	}

	renderUploadVideoModal() {
		const { upload: { loading, name, percent, error }} = this.props;
		return loading && (<UploadPercentModal cancel={this.onCancelUploadVideo} close={this.onCloseUploadVideoModal} error={error} text={name} percent={percent} />);
	}

	renderFileField = (props) => {
		const { input, refProp } = props;
		return (
			<input
				ref={refProp}
				onChange={(e) => this.onChangeMessageFile(e, input)}
				type='file'
				className='mobile-message-file-field__input'
			/>
		);
	};

	renderSelectFileBlock() {
		const { messageFile, translate } = this.props;

		return (
			<div className='mobile-message-file-field select-image-name'>
				<label className='col-form-label mobile-message-file-field__label'>{translate('LABEL_APP_IMAGEVIDEO')}:</label>
				<button onClick={this.onOpenMessageFileInput} className='btn btn--select btn--select--primary' type='button'>
					{translate('BTN_SELECT')}
				</button>
				<Field name='ImageOrVideo' refProp={(ref) => this.messageFileInput = ref} component={this.renderFileField} />
				<span className='mobile-message-file-field__file-name'>{messageFile && messageFile['name'] || ''}</span>
				<div className='mobile-message-file-field__action-button'>
					{ messageFile ? (
							<span>
								{ messageFile.url
									? <i onClick={this.onDownloadMessageFile} className='fa fa-cloud-download file-action-icon'/>
									: null }
								<i onClick={this.onDeleteMessageFile} className='fa fa-trash file-action-icon' />
							</span>
						) : null
					}
				</div>
			</div>
		);
	}

	render() {
		const { translate } = this.props;

		return (
			<div className='mobile-message-content card content-template'>
				<form className='mobile-message-content__form'>
					<div className='title'>{translate('TITLE_APPMESSAGEINPUT')}</div>
					<div className="form-group column">
						<label className="col-sm-12 col-form-label">{translate('LABEL_APP_TITLE')}:</label>
						<div className="col-sm-12">
							<Field className='form-control' name='Title' maxLength={50} component='input' type='text'/>
						</div>
					</div>
					<div className="form-group column">
						<label className="col-sm-12 col-form-label">{translate('LABEL_APP_INTRO')}:</label>
						<div className="col-sm-12">
							<Field className='mobile-message-content__intro-textarea form-control' name='Intro' component='textarea'/>
						</div>
					</div>
					<div className="mobile-message-content__message-container form-group column">
						<label className="col-sm-12 col-form-label">{translate('LABEL_APP_MESSAGE')}:</label>
						<div className="mobile-message-content__message-textarea-container col-sm-12">
							<Field className='form-control' name='Message' component='textarea'/>
						</div>
					</div>
					{ this.renderSelectFileBlock() }
				</form>
				{ this.renderValidFileDialogModal() }
				{ this.renderUploadVideoModal() }
			</div>
		);
	}
}

const mobileMessageContentForm = 'mobile-message-content';
const mobileMessageContentSelector = formValueSelector(mobileMessageContentForm);

const select = (state) => {
	return {
		initialValues: getMobileMessageContent(state),
		messageFile: mobileMessageContentSelector(state, 'ImageOrVideo'),
		upload: state.mobile.video,
		translate: getTranslate(state.locale)
	}
};

export default compose(connect(select, { uploadMobileMessageVideo, closeUploadMobileMessageVideo, cancelUploadMobileMessageVideo }), reduxForm({form: mobileMessageContentForm, enableReinitialize: true}))(MobileMessageContent);
