import React from 'react';
import { connect } from 'react-redux';
import { formValueSelector } from 'redux-form';
import { Scrollbars } from 'react-custom-scrollbars';
import ReactResizeDetector from 'react-resize-detector';
import phonePreview from '../../../../assets/svg/phone-preview.svg';
import { ImageCroppie, VideoPlayer } from '../../../../shared-components';


class MobileContentPreview extends React.Component {

  constructor(props) {
    super(props);

    this.state = { phoneHeight: 0, width: 450, height: 220 };

	  this.renderImage = this.renderImage.bind(this);
	  this.renderVideoPlayer = this.renderVideoPlayer.bind(this);
	}

	_onResize = (width, height) => { //resize preview block
    const phoneHeight = height - 315;
		this.setState({ phoneHeight: phoneHeight });

		width = width - 50;
		const rotation = this.state.width / width;
		const newHeight = this.state.height / rotation;
		this.setState({ height: newHeight, width: width});
	}

	renderVideoPlayer() {
		const { height, width } = this.state;
		const { messagePreviewContent: { ImageOrVideo } } = this.props;
		const videoUrl = ImageOrVideo && ImageOrVideo.messageFileType === 'video' ? ImageOrVideo.url : false;

    // return (
    //   <div>
	   //    <video className="mobile-preview-phone__view" width={width} height={height} controls>
	   //      <source src={videoUrl} type="video/mp4"/>
	   //      <source src={videoUrl} type="video/ogg"/>
	   //      Your browser does not support the video tag.
	   //    </video>
    //   </div>
    // )

		return videoUrl ? <div className='mobile-preview-phone__view video'><VideoPlayer width={width} height={height} url={videoUrl} /></div>: null;
	}

  renderImage() {
	  const { height, width } = this.state;
	  const { messagePreviewContent: { ImageOrVideo }} = this.props;
	  const imageUrl = ImageOrVideo && ImageOrVideo.messageFileType === 'image' ? ImageOrVideo.url || ImageOrVideo.tmpUrl : false;

	  return (
			<div className='mobile-preview-phone__view'>
				<ImageCroppie url={imageUrl} width={338} height={338} />
			</div>
	  )
  }

	render() {
	  const { selectedMessage, user } = this.props;
	  const FirstName = user && user.FirstName;
	  const LastName = user && user.LastName;

    const { phoneHeight, height, width } = this.state;
    const { messagePreviewContent: { ImageOrVideo, Title, Intro, Message } } = this.props;
    const imageUrl = ImageOrVideo && ImageOrVideo.messageFileType === 'image' ? ImageOrVideo.url || ImageOrVideo.tmpUrl : false;
	  const videoUrl = ImageOrVideo && ImageOrVideo.messageFileType === 'video' ? ImageOrVideo.url : false;

	  return (
      <div className="mobile-preview-phone">
        <ReactResizeDetector handleWidth handleHeight onResize={this._onResize} />
        <img className='mobile-preview-phone__model' src={phonePreview} alt='' />
          { videoUrl ? this.renderVideoPlayer() : null }
	        { imageUrl ? this.renderImage() : null }
	        { !videoUrl && !imageUrl ? (<div className='mobile-preview-phone__view empty' />) : null}
	      <div className='mobile-preview-details'>
		      <Scrollbars autoHide autoHideTimeout={500} autoHideDuration={100}
		                  style={{ maxWidth: 338, height: 252}}
		                  renderTrackHorizontal={props => <div {...props} style={{display: 'none'}} className="track-horizontal"/>}
		                  renderThumbHorizontal={props => <div {...props} style={{ width: 338 }} />}
		                  renderThumbVertical={props => <div {...props} className="vertical-scroll"/>}
		                  renderView={props => <div {...props} className="scroll-content"/>}>
			      <span className="mobile-preview-details__title">{ Title || '' }</span>
			      <div className="mobile-preview-title">
			        <span className="mobile-preview-title__author">{ selectedMessage && selectedMessage.CreatedByUserId ? FirstName + ' ' + LastName : ''}</span>
			        <span className="mobile-preview-title__publish-date"/>
			      </div>
			      <div className='d-flex flex-column'>
			        <span className="mobile-preview-details__intro"  dangerouslySetInnerHTML={{__html: Intro ? Intro.replace(/\n/g, '<br />') : '' }} />
			        <span className="mobile-preview-details__message" dangerouslySetInnerHTML={{__html: Message ? Message.replace(/\n/g, '<br />') : '' }} />
		        </div>
		      </Scrollbars>
		      <div className="gradientback"></div>
	      </div>
      </div>
    );
  }
}

const mobileMessageContentForm = 'mobile-message-content';
const selectorPreview = formValueSelector(mobileMessageContentForm);

const select = state => {
	return {
		user: state.user.current,
		selectedMessage: state.mobile.selectedMessage,
		messagePreviewContent: selectorPreview(state, 'Title', 'Intro', 'Message', 'ImageOrVideo')
	}
};

export default connect(select, { })(MobileContentPreview);
