import React from 'react';
import { connect } from 'react-redux';
import Modal from './Modal';
import { selectors as modalSelectors, actions as modalActions } from '../../../../store/modules/Modal';

// Import all modal screens
import AuthModal from '../../../../containers/Auth/components/ModalContainer';
import AgentSignupForm from '../../../../containers/Auth/components/AgentSignupForm';
import PhoneSignupForm from '../../../../containers/Auth/components/PhoneSignUpForm';
import ReportIssueModal from '../../../../containers/PropertySingle/components/ReportIssueModal';


import AddPropertyModal from '../../../../containers/Favourites/components/AddPropertyModal';
import FavouriteSingleCommentsModal from '../../../../containers/FavouriteSingle/components/FavouriteSingleCommentsModal';
import ConfirmDeleteFavouriteModal from '../../../../containers/Favourites/components/ConfirmDeleteFavouriteModal';
import JoinFavouritesHelloModal from '../../../../containers/JoinFavourites/components/JoinFavouritesHelloModal';


const modalScreens = {
    auth: AuthModal,
    agentSignup: AgentSignupForm,
    selectWishlist: AddPropertyModal,
    confirmDeleteFavourites: ConfirmDeleteFavouriteModal,
    joinFavouritesHelloModal: JoinFavouritesHelloModal,
    phoneSignup: PhoneSignupForm,
    reportIssue: ReportIssueModal,
    favouriteSingleComments: FavouriteSingleCommentsModal,
};

class ModalContainer extends React.PureComponent {
    constructor() {
        super();

        this.handleOpen = this.handleOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    handleOpen() {
        if (document) {
            document.documentElement.style.top = 0;
        }
    }

    handleClose() {
        if (document) {
            document.body.style.fixed = 'intiial';
            document.body.style.overflow = 'intiial';
        }
        this.props.closeAuthModal();
    }

    generateProps() {
        return {
            ...this.props,
            Screen: modalScreens[this.props.modalName],
            handleOpen: this.handleOpen,
            handleClose: this.handleClose,
        };
    }

    render() {
        const props = this.generateProps();
        return <Modal {...props} />;
    }
}

const mapStateToProps = state => ({
    isModalVisible: modalSelectors.modalVisible(state),
    modalName: modalSelectors.modalName(state),
    modalDisableOnOverlay: modalSelectors.modalDisableOnOverlay(state),
});

const mapDispatchToProps = dispatch => ({
    closeAuthModal() {
        dispatch(modalActions.hideModal());
    },
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ModalContainer);

