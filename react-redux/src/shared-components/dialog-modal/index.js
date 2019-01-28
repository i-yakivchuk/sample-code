/**
 * Created by ivan on 10.03.18.
 */
import React, { Component } from 'react';
import { Modal } from 'reactstrap';

export const DIALOG_TYPE_CONFIG = [
	{ color: '#F53D3D', icon: 'fa fa-exclamation-triangle', title: 'Validation error' },//type 0 (valid type)
];

export default class DialogModal extends Component {

	constructor(props) {
		super(props);

		this.state = { dialogTypes: DIALOG_TYPE_CONFIG };
		this.renderDialogModalTitle = this.renderDialogModalTitle.bind(this);
	}

	renderDialogModalTitle() {
		const { type } = this.props;
		const dialogType = this.state.dialogTypes[type] || {};

		return (
			<div className='title'>
				<span { ...(dialogType.color ? { ...{style: { color: dialogType.color }} } : null) } >
					<i { ...(dialogType.color ? { ...{className: dialogType.icon } } : null) } />&nbsp;&nbsp;{ dialogType.title ? dialogType.title : ''}
				</span>
			</div>
		);
	}

	render() {
		const { close, text } = this.props;

		return (
			<div>
				<Modal modalTransition={{ timeout: 15 }} backdropTransition={{ timeout: 10 }} zIndex={9999} fade={true} backdropClassName='custom-confirm-modal-bg' isOpen={true} className={'custom-confirm-modal'}>
					<div className='panel'>
						{ this.renderDialogModalTitle() }
						<div className='text'>{text}</div>
						<div className='d-flex justify-content-end'>
							<button onClick={close} className='btn btn--select btn--select--primary' type='button'>Ok</button>
						</div>
					</div>
				</Modal>
			</div>
		);
	}
};
