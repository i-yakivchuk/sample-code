import { connect } from 'react-redux';
import { selectors as wishlistSelectors, actions as wishlistActions } from '../../../../store/modules/Wishlist';
import { actions as modalActions } from '../../../../store/modules/Modal';
import ConfirmDeleteFavouriteModal from './ConfirmDeleteFavouriteModal';

class ConfirmDeleteFavouriteContainer extends React.PureComponent {
    state = {
        isModalOpen: false,
    };

    handleCloseClick = () => {
            this.props.showModal('selectWishlist');
    };

    handleCreateListSubmit = (body) => {
        this.props.handleCreateList({ title:body.name }).then( () => {
            this.setCreateListActive(false);
        });

    };

    handleConfirmModal = () => {
        const { selectedPropertyId,selectedWishListId } =this.props;
        const propertyId = selectedPropertyId;
        const id = selectedWishListId;
        this.props.removeProperty({ id, propertyId }).then( () => {
            this.props.showModal('selectWishlist');
        });
    };

    generateProps = () => ({
        ...this.state,
        ...this.props,
        handleCloseClick: this.handleCloseClick,
        handleConfirmModal: this.handleConfirmModal,

    });

    render() {
        const props = this.generateProps();
        return <ConfirmDeleteFavouriteModal {...props} />;
    }
}

const mapStateToProps = state => ({
    selectedPropertyId: wishlistSelectors.getSelectedPropertyId(state),
    selectedWishListId: wishlistSelectors.getSelectedListId(state),
});

const mapDispatchToProps = {
    removeProperty: wishlistActions.removeProperty,
    hideModal: modalActions.hideModal,
    showModal:modalActions.showModal
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ConfirmDeleteFavouriteContainer);
