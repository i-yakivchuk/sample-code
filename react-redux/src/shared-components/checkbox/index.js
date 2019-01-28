/**
 * Created by ivan on 03.02.18.
 */
import React, { Component } from 'react';
import classNames from  'classnames';


export default class CheckBox extends Component {

	constructor(props) {
		super(props);

		this.state = { checked: this.props.checked || false };

		this.checkedBox = this.checkedBox.bind(this);
		this.renderBaseCheckBoxType = this.renderBaseCheckBoxType.bind(this);
		this.renderMainCheckBoxType = this.renderMainCheckBoxType.bind(this);
	}

	componentWillReceiveProps(nextProps) {
		if (this.props.checked != nextProps.checked)
			this.setState({checked: nextProps.checked}); // if change state checked from props
	}

	checkedBox() {
		this.setState({checked: !this.state.checked});
		this.props.onClick && this.props.onClick(!this.state.checked);
	}

	renderMainCheckBoxType() {
		const { checked } = this.state;

		return (
			<span onClick={this.checkedBox} className='custom-checkbox fa-stack fa-lg'>
			  <i className={classNames('fa fa-circle fa-stack-2x', {'green-circle': checked, 'gray-circle': !checked})} />
			  <i className={classNames('fa fa-check fa-stack-1x checked-icon', {'white-checked': checked, 'black-checked': !checked})} />
			</span>
		);
	}

	renderBaseCheckBoxType() {
		const { checked } = this.state;

		return (
			<span onClick={this.checkedBox} className='custom-checkbox fa-stack fa-lg'>
			  <i className={classNames('fa fa-stack-2x', {'fa-circle green-circle': checked, ' fa-circle-thin gray-circle': !checked})} />
				{checked && (<i className='fa fa-check fa-stack-1x checked-icon white-checked' />)}
			</span>
		);
	}

	render() {
		const { main } = this.props;
		return main ? this.renderMainCheckBoxType() : this.renderBaseCheckBoxType();
	}
};
