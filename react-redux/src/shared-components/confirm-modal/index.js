/**
 * Created by ivan on 03.02.18.
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'reactstrap';

ConfirmModal.propTypes = {
	isOpen: PropTypes.bool.isRequired,
	text: PropTypes.string.isRequired,
	confirm: PropTypes.func.isRequired,
	cancel: PropTypes.func.isRequired
};

export default function ConfirmModal({ isOpen, text, confirm, cancel }) {
	return (
		<Modal modalTransition={{ timeout: 15 }} backdropTransition={{ timeout: 10 }} zIndex={9999} fade={true} backdropClassName='custom-confirm-modal-bg' isOpen={isOpen} className={'custom-confirm-modal'}>
			<div className='panel'>
				<div className='title'><i className='fa fa-exclamation-triangle' /> Confirm</div>
				<div className='text'>{text}</div>

				<div className='d-flex justify-content-end'>
					<button onClick={confirm} className='btn btn--primary btn--select btn--text-white btn--default-600' type='button'>
						<i className='fa fa-check icons'/>&nbsp;Yes
					</button>
					<button onClick={cancel} className='btn btn--danger btn--helvetica-bold btn--padding-0 btn--radius-2 btn--slide-size btn--next-btn' type='button'>
						<i className='fa fa-times icons'/>&nbsp;No
					</button>
				</div>
			</div>
		</Modal>
	);
}
