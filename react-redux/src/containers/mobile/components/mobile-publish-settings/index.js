import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { reduxForm, Field } from 'redux-form';
import { getMobileMessagePublishSettings } from '../../../../selectors/mobile';
import { getMobileMessageUsers, getMobileMessageUsersSuccess } from '../../../../actions/mobile';
import { DateTimePicker } from './../../../../shared-components';
import classNames from 'classnames';
import { MobileUsersModal } from '../../components';
import * as R from 'ramda';
import { getTranslate } from 'react-localize-redux';
import Can from "../../../../components/rights/component";


class MobilePublishSettings extends React.Component {

	constructor(props) {
		super(props);

		this.state = { showMobileUsersModal: false };

		this.toggle = this.toggle.bind(this);
		this.onLoadMobileMessageUsers = this.onLoadMobileMessageUsers.bind(this);
		this.renderSelectedMobileUsers = this.renderSelectedMobileUsers.bind(this);
	}

	componentWillReceiveProps(nextProps) {
		if (!R.equals(this.props.selectedMessage, nextProps.selectedMessage))
			this.onLoadMobileMessageUsers(nextProps);
	}

	onLoadMobileMessageUsers(props) {
		if (!props.selectedMessage || typeof props.selectedMessage.Id === 'undefined') {
			this.props.getMobileMessageUsersSuccess({}); //reset mobile users modal
		} else {
			this.props.getMobileMessageUsers(props.selectedMessage.Id);
		}
	}

	toggle() {
		this.setState({ showMobileUsersModal: !this.state.showMobileUsersModal });
	}

	renderSelectedMobileUsers(props) {
		const { translate } = this.props;
		const { input } = props;
		const count = input.value && input.value.Users && input.value.Users.filter(user => user.Selected).length;
		return (
			<span>
				{count > 0 ? (<span className='selected-count'>&nbsp;&nbsp;{translate('LABEL_APP_ONMOBILESTEXT_1')}{' '}<b>{count}{' '}{translate('LABEL_APP_ONMOBILESTEXT_2')}</b></span>) : null}
				<input value={input.value} onChange={input.onChange} type='hidden' {...props} />
			</span>
		);
	}

	renderDateField = ({ input }) => {
		return (<DateTimePicker {...input} data-enable-time value={input.value} onChange={input.onChange} />);
	};

	renderCheckbox = ({ input }) => {
		return (<i style={{ cursor: 'pointer' }} className={classNames('fa', {'fa-check-circle': input.value, 'fa-circle-thin': !input.value}, 'publish-icon')} onClick={() => input.onChange(!input.value)}/>);
	};

	render() {
		const { showMobileUsersModal } = this.state;
		const { submitting, translate } = this.props;

		return (
			<div className='mobile-publish-settings card'>
				{ showMobileUsersModal && (<MobileUsersModal translate={translate} close={this.toggle} />) }
				<form>
					<span className='title'>{translate('TITLE_APPPUBLICATION_SETTINGS')}</span>
					<div className="form-group row">
						<label className="col-sm-4 col-form-label text-right">{translate('LABEL_SLIDE_NAME')}:</label>
						<div className="col-sm-8 no-pl">
							<Field className='form-control' name='Name' maxLength={50} component='input' type='text'/>
						</div>
					</div>
					<div className="form-group row">
						<label className="col-sm-4 col-form-label text-right">{translate('LABEL_APP_STARTPUBLICATION')}:</label>
						<div className="col-sm-8 no-pl">
							<div className="d-flex justify-content-start">
								<span className="flat-date-picker">
									<Field name='StartOn' component={this.renderDateField}/>
								</span>
							</div>
						</div>
					</div>
					<div className="form-group row">
						<label className="col-sm-4 col-form-label text-right">{translate('LABEL_APP_ENDPUBLICATION')}:</label>
						<div className="col-sm-8 no-pl">
							<div className="d-flex justify-content-start">
								<span className="flat-date-picker">
									<Field name='EndOn' component={this.renderDateField}/>
								</span>
							</div>
						</div>
					</div>
					<div className="form-group row margin-top-5">
						<label className="col-sm-4 col-form-label text-right">{translate('LABEL_APP_ONMOBILES')}:</label>
						<div className="col-sm-8 no-pl">
							<button disabled={submitting} className="btn btn--select btn--select--primary" onClick={this.toggle} type="button">{translate('BTN_SELECT')}</button>
							<Field name='Users' component={this.renderSelectedMobileUsers}/>
						</div>
					</div>
					<Can rights={['allowPublish']} types={[2, 4]}>
						<div className="form-group row margin-top-15">
							<label className="col-sm-4 col-form-label text-right">{translate('LABEL_APP_PUBLISH')}:</label>
							<div className="col-sm-8 text-left no-pl">
								<Field name='IsPublished' component={this.renderCheckbox}/>
							</div>
						</div>
					</Can>
				</form>
			</div>
		);
	}
}

const select = (state) => {
	return {
		submitting: state.mobile.submitting,
		loading: state.mobile.loading,
		selectedMessage: state.mobile.selectedMessage,
		initialValues: getMobileMessagePublishSettings(state),
		translate: getTranslate(state.locale)
	}
};

export default compose(connect(select, { getMobileMessageUsers, getMobileMessageUsersSuccess }), reduxForm({form: 'mobile-message-publish-settings', enableReinitialize: true}))(MobilePublishSettings);
