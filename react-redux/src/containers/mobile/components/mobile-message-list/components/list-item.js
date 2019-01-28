import React from 'react';
import { connect } from 'react-redux';
import classNames from  'classnames';
import { getMobileMessageThumb } from '../../../../../selectors/mobile';
import { encodingMobileMessageVideo } from '../../../../../actions/mobile';
import { getTranslate } from 'react-localize-redux';

const DEFAULT_STATUS = (translate) => {
	return {
		'active': translate('STATUS_ACTIVE'),
		'planned': translate('STATUS_PLANNED'),
		'concept': translate('STATUS_CONCEPT')
	}
};


class MobileMessageListItem extends React.Component {

  constructor(props) {
    super(props);

    this.renderListSlide = this.renderListSlide.bind(this);
    this.renderImagePreview = this.renderImagePreview.bind(this);
    this.renderVideoProgress = this.renderVideoProgress.bind(this);
  }

  componentDidMount() {
    const {slide} = this.props;
    const {Id: _rawId} = slide && slide.RawMessageAttachments.length > 0 ? slide.RawMessageAttachments[0] : {};

    if (slide && slide.RawMessageAttachments.length > 0)
      this.props.encodingMobileMessageVideo(_rawId, slide.Id);
  }

  renderVideoProgress() {
    const {slide} = this.props;
    const {EncodingComMedia} = slide && slide.RawMessageAttachments.length > 0 ? slide.RawMessageAttachments[0] : {};
    const percent = EncodingComMedia && EncodingComMedia.ProgressTotal && EncodingComMedia.ProgressTotal || 0;

    return (
      <div className='img-fluid' style={{position: 'relative'}}>
        <div style={{backgroundColor: '#5FCCFF'}} className='slide-preview-image'></div>
        <span style={{width: percent + '%'}} className='progress-video-hint'/>
        <span className='image-wrapper__video'><i className='icon menu-icon icon-triangle'/></span>
        <span className='progress-video-en-bar'>Processing uploaded video {percent}%</span>
      </div>
    );
  }

  renderImagePreview(isGrid = false) {
    const {slide} = this.props;
    const isRenderVideoProgress = slide && slide.RawMessageAttachments.length > 0;
    const {imageSrc, isVideoIcon} = getMobileMessageThumb(slide);

    return (
      <div className='image-wrapper'>
        { isRenderVideoProgress ? (isGrid ? this.renderVideoProgress() : this.renderListSlideVideoProgress()) : (
            <div style={imageSrc ? {backgroundImage: 'url(' + imageSrc + ')'} : {backgroundColor: '#5d7893'}} className='slide-preview-image'></div>) }
        { isVideoIcon ? (
            <span className='image-wrapper__video'><i className='icon menu-icon icon-triangle'/></span>) : null }
      </div>
    );
  }

  renderListSlideVideoProgress() {
    const {slide} = this.props;
    const {EncodingComMedia} = slide && slide.RawMessageAttachments.length > 0 ? slide.RawMessageAttachments[0] : {};
    const percent = EncodingComMedia && EncodingComMedia.ProgressTotal && EncodingComMedia.ProgressTotal || 0;

    return (
      <div className='img-fluid' style={{position: 'relative'}}>
        <div style={{backgroundColor: '#5FCCFF'}} className='slide-preview-image'></div>
        <span style={{width: percent + '%'}} className='progress-video-hint'/>
        <span className='image-wrapper__video'><i className='icon menu-icon icon-triangle'/></span>
        <span className='progress-video-en-bar'>{percent}%</span>
      </div>
    );
  }

  renderNewListSlide() {
    return (
      <div className='d-flex justify-content-start list new-slide'>
        <div className='add-new-slide-image'></div>
      </div>
    );
  }

  renderListSlide() {
    const { slide, selectedMessage, translate } = this.props;
    const selectedId = selectedMessage && selectedMessage.Id ? selectedMessage.Id : false;
    const isSelected = selectedId && slide && slide.Id && slide.Id === selectedId;
    const isVideoEncoding = slide && slide.RawMessageAttachments.length > 0 && slide.RawMessageAttachments[0];

    return (
      <div onClick={ () => this.props.onMessageSelect(slide) }
           className={classNames('d-flex justify-content-start list', {'preview-block-select-active': isSelected })}>
        <div>{this.renderImagePreview()}</div>
        <div className="p-2 align-self-center"><p className="card-title__text">{slide.Name}</p></div>
        <div className="ml-auto p-2 align-self-center slide-status"><span
          className={classNames('card-title__status', 'card-title__status--' + (!isVideoEncoding ? slide.Status : 'encoding'))}>{(!isVideoEncoding ? DEFAULT_STATUS(translate)[slide.Status] : 'Processing')}</span>
        </div>
        <hr className="card__hr"/>
      </div>
    );
  }

  renderList() {
    const { slide : {Id: _id} } = this.props;
    return _id && _id !== 0 ? this.renderListSlide() : this.renderNewListSlide();
  }

  render() {
    return (<div className='col-md-4 col-sm-5 col-xs-6 preview-block'>{ this.renderList() }</div>);
  }
}

const select = (state) => {
  return {
    selectedMessage: state.mobile.selectedMessage,
	  translate: getTranslate(state.locale)
  };
};
export default connect(select, { encodingMobileMessageVideo })(MobileMessageListItem);
