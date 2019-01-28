import * as React from "react";
import { SuccessRegistrationMessageAsProp } from '../../types';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

interface SuccessRegistrationPopUp extends SuccessRegistrationMessageAsProp {
    successRegistrationModal: boolean,
    modalToggle(): void
}

const SuccessRegistrationPopUp = (props: SuccessRegistrationPopUp) => {
    const regMess = props.successRegistrationMessage;
    return (
        (regMess || null) &&
        <Modal className="success-registration-modal" isOpen={props.successRegistrationModal} toggle={props.modalToggle}>
            <ModalHeader toggle={props.modalToggle}>{regMess.title}</ModalHeader>
            <ModalBody>
                {regMess.message}
            </ModalBody>
            <ModalFooter>
                <Button onClick={props.modalToggle} className="modal-button">Ok</Button>
            </ModalFooter>
        </Modal>
    )
}

export default SuccessRegistrationPopUp;