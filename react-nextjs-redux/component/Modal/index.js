import React from 'react';
import Modal from './Modal';

class ModalContainer extends React.PureComponent {
    constructor() {
        super();

        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);

        this.state = {};
    }

    openModal(handleOpen) {
        const offset = new String(`-${window.pageYOffset}px`);

        document.body.style.width = '100%';
        document.body.style.position = 'fixed';
        document.body.style.overflow = 'hidden';
        // document.body.style.top = offset;

        if (typeof handleOpen === 'function') {
            handleOpen();
        }
    }

    closeModal(handleClose) {
        const offset = new Number(parseInt(document.body.style.top)) * -1;

        document.body.style.overflow = 'initial';
        document.body.style.position = 'initial';
        window.scrollTo(0, offset);

        if (typeof handleClose === 'function') {
            handleClose();
        }
    }

    generateProps() {
        return {
            ...this.props,
            ...this.state,
            openModal: this.openModal,
            closeModal: this.closeModal,
        };
    }

    render() {
        const props = this.generateProps();
        return <Modal {...props} />;
    }
}

export default ModalContainer;
