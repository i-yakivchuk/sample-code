/**
 * Created by ivan on 17.03.18.
 */
import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { reduxForm, Field, FieldArray, formValueSelector } from 'redux-form';
import { getMobileMessageUsers } from '../../../../selectors/mobile';
import { changeMobileMessageUsers } from '../../../../actions/mobile';
import { Scrollbars } from 'react-custom-scrollbars';
import classNames from  'classnames';
import * as R from 'ramda';


class MobileUsersModal extends React.Component {

	constructor(props) {
		super(props);

		this.renderUser = this.renderUser.bind(this);
		this.renderUsers = this.renderUsers.bind(this);
		this.applyChanges = this.applyChanges.bind(this);
		this.onFilterUsers = this.onFilterUsers.bind(this);
		this.renderCategory = this.renderCategory.bind(this);
		this.renderCategories = this.renderCategories.bind(this);
		this.onCheckedCategory = this.onCheckedCategory.bind(this);
		this.renderUsersCheckbox = this.renderUsersCheckbox.bind(this);
		this.onCheckedAllCategory = this.onCheckedAllCategory.bind(this);
		this.renderCategoryCheckbox = this.renderCategoryCheckbox.bind(this);
	}

	applyChanges() {
		const { close, formValues } = this.props;
		this.props.changeMobileMessageUsers(formValues);
		close();
	}

	onFilterUsers() {
		const { formValues, array, } = this.props;
		const jobIds = formValues['Jobs'] && formValues['Jobs'].filter(item => item.Selected).map(item => item.Id);
		const departmentIds = formValues['Departments'] && formValues['Departments'].filter(item => item.Selected).map(item => item.Id);
		const companyIds = formValues['Companies'] && formValues['Companies'].filter(item => item.Selected).map(item => item.Id);

		let users = [];
		formValues['Users'] && formValues['Users'].map((item, index) => {
			if (R.contains(item.JobId, jobIds) && R.contains(item.DepartmentId, departmentIds) && R.contains(item.CompanyId, companyIds)) {
				users.push(Object.assign({}, item, { Active: true }));
			} else {
				users.push(Object.assign({}, item, { Active: false, Selected: false }));
			}
		});

		array.removeAll('Users');
		users.sort(function(x, y) { return y.Active - x.Active; });
		users && users.map((item, index) => { array.insert('Users', index, item); });
	}

	onCheckedCategory(input) {
		const { value } = input;

		input.onChange(Object.assign({}, value, { Selected: !value.Selected }));
		setTimeout(() => { this.onFilterUsers(); }, 100); //hold for action
	}

	onCheckedAllCategory(type, selected) {
		const { change, formValues } = this.props;

		formValues[type] && formValues[type].map((item, index) => {
			if (type === 'Users') {
				if (item.Active)
					change(`${type}[${index}]`, Object.assign({}, item, { Selected: !selected }));
			} else {
				change(`${type}[${index}]`, Object.assign({}, item, { Selected: !selected }));
			}
		});

		setTimeout(() => { this.onFilterUsers(); }, 100); //hold for action
	}

	renderCategory(props) {
		const { input: { value } } = props;
		return <button {...props} onClick={() => this.onCheckedCategory(props.input)}
		               className={classNames('sub-item sub-item__btn sub-item--tag', {'active': value.Selected })}>{value.Name}</button>;
	}

	renderCategories(props) {
		const { fields } = props;

		return (
			<div>
				{fields.map((field, index) => (
					<Field name={field} key={index} component={this.renderCategory}/>
				))}
			</div>
		);
	}

	renderCategoryCheckbox(type) {
		const { formValues } = this.props;
		const defaultLength = formValues[type] && formValues[type].length || 0;
		const selectedLength = formValues[type] && formValues[type].filter((item) => item.Selected).length || 0;
		const isSelected = defaultLength == selectedLength != 0;

		return (<i onClick={() => {this.onCheckedAllCategory(type, isSelected)}}
		           className={classNames('fa publish-icon item-block__icon', {'fa-check-circle': isSelected, 'fa-circle-thin': !isSelected})} />);
	}

	renderUsersCheckbox() {
		const { formValues, translate } = this.props;
		const defaultLength = formValues['Users'] && formValues['Users'].filter(item => item.Active).length;
		const selectedLength = formValues['Users'] && formValues['Users'].filter((item) => item.Selected && item.Active).length;
		const isSelected = ((defaultLength === selectedLength) && defaultLength !== 0);

		return (
			<span>
				<i onClick={() => { this.onCheckedAllCategory('Users', isSelected) }} className={classNames('fa publish-icon item-block__icon', {'fa-check-circle': isSelected, 'fa-circle-thin': !isSelected})} />
				{ selectedLength > 0 && (<span className="item-block__text">{selectedLength}{' '}{translate('SUBTITLE_SELECTED')}</span>)}
			</span>
		);
	}

	renderUser(props) {
		const { input: { value } } = props;
		return (<div className={classNames("sub-item", "sub-item--player", {'greyed': !value.Active})} >
			<i onClick={() => this.onCheckedCategory(props.input)} className={classNames('fa publish-icon item-block__icon', {'fa-check-circle': value.Selected, 'fa-circle-thin': !value.Selected, 'hidden': !value.Active })}/>
			<i className='menu-icon icon-mobile-grey' />
			<button className='opacity-btn text-btn'>{value.Name}</button>
		</div>);
	}

	renderUsers(props) {
		const { fields } = props;

		return (
			<div>
				{fields.map((field, index) => (
					<Field name={field} key={index} component={this.renderUser}/>
				))}
			</div>
		);
	}

	render() {
		const { translate, close, dirty } = this.props;

		return (
			<div>
				<Modal backdrop={true} zIndex={99999} isOpen={true} backdropClassName='mobile-users-modal-background' className='mobile-users-modal'>
					<ModalHeader>{translate('TITLE_APPSELECTUSERS')}</ModalHeader>
					<ModalBody>
						<article className="mobile-users-tag item-block item-block--tags">
							<aside className={classNames('item-block tag dark-blue')}>
								<header>
									{ this.renderCategoryCheckbox('Companies') }
									<span className="item-block__text">{translate('SUBTITLE_APPCOMPANY')}</span>
								</header>
								<main>
									<Scrollbars style={{ height: '450px' }} autoHide autoHideTimeout={500} autoHideDuration={100}
									            renderThumbVertical={props => <div {...props} className="vertical-scroll"/>}
									            renderView={props => <div {...props} className="scroll-content"/>}>
										<FieldArray name="Companies" component={this.renderCategories} />
									</Scrollbars>
									<div className="gradientback"></div>
								</main>
							</aside>
							<aside className={classNames('item-block tag violet')}>
								<header>
									{ this.renderCategoryCheckbox('Departments') }
									<span className="item-block__text">{translate('SUBTITLE_APPDEPARTMENT')}</span>
								</header>
								<main>
									<Scrollbars style={{ height: '450px' }} autoHide autoHideTimeout={500} autoHideDuration={100}
									            renderThumbVertical={props => <div {...props} className="vertical-scroll"/>}
									            renderView={props => <div {...props} className="scroll-content"/>}>
										<FieldArray name="Departments" component={this.renderCategories} />
									</Scrollbars>
									<div className="gradientback"></div>
								</main>
							</aside>
							<aside className={classNames('item-block tag blue')}>
								<header>
									{ this.renderCategoryCheckbox('Jobs') }
									<span className="item-block__text">{translate('SUBTITLE_APPJOB')}</span>
								</header>
								<main>
									<Scrollbars style={{ height: '450px' }} autoHide autoHideTimeout={500} autoHideDuration={100}
									            renderThumbVertical={props => <div {...props} className="vertical-scroll"/>}
									            renderView={props => <div {...props} className="scroll-content"/>}>
										<FieldArray name="Jobs" component={this.renderCategories} />
									</Scrollbars>
									<div className="gradientback"></div>
								</main>
							</aside>
						</article>
						<article className="mobile-users-tag item-block--players">
							<header style={{marginBottom: '12px' }}>
								{ this.renderUsersCheckbox() }
							</header>
							<main>
								<Scrollbars style={{ height: '450px' }} autoHide autoHideTimeout={500} autoHideDuration={100}
								            renderThumbVertical={props => <div {...props} className="vertical-scroll"/>}
								            renderView={props => <div {...props} className="scroll-content"/>}>
									<FieldArray name="Users" component={this.renderUsers} />
								</Scrollbars>
								<div className="gradientback"></div>
							</main>
						</article>
					</ModalBody>
					<ModalFooter>
						<button onClick={close} className="btn btn--select btn--select--primary btn-padding"><span>{translate('BTN_DISCARD')}</span></button>&nbsp;&nbsp;&nbsp;
						<button onClick={this.applyChanges} disabled={!dirty} className="btn btn--select btn--primary btn-padding-10 btn--text-white"><i
							className="fa fa-check"/>&nbsp;&nbsp;<span>{translate('BTN_APPLYCHANGES')}</span></button>
					</ModalFooter>
				</Modal>
			</div>
		);
	}
}

const selectorMobileUsers = formValueSelector('mobile-users-modal');

const select = (state) => {
	return {
		formValues: selectorMobileUsers(state, 'Departments', 'Users', 'Jobs', 'Companies'),
		initialValues: getMobileMessageUsers(state)
	}
};

export default compose(connect(select, { changeMobileMessageUsers }), reduxForm({form: 'mobile-users-modal', enableReinitialize: true }))(MobileUsersModal);
