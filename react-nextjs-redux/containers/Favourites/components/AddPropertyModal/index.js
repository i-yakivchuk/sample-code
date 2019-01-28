import { connect } from 'react-redux';
import { selectors as wishlistSelectors, actions as wishlistActions } from '../../../../store/modules/Wishlist';
import { actions as modalActions } from '../../../../store/modules/Modal';
import AddPropertyModal from './AddPropertyModal';
import uuidv4 from 'uuid/v4';
import isEmptyString from 'validator/lib/isEmpty';


class AddPropertyModalContainer extends React.PureComponent {
    state = {
        isCreateListActive: false,
        createError: false,
    };

    componentDidMount() {
        this.props.fetchLists();
    };

    handleCloseClick = () => {
        this.props.hideModal();
    };

    setCreateListActive = (active) => {
        this.setState({ isCreateListActive: active, createError: false });
    };

    handleCreateListSubmit = (body) => {
        const { name } = body;
        if (name && !isEmptyString(name, { ignore_whitespace: true })) {
            this.props.handleCreateList({ id: uuidv4(), title: name }).then(() => {
                this.setCreateListActive(false);
            });
        } else {
            this.setState({ createError: true });
        }
    };

    handleConfirmModal = () => {
      this.setState(prevState => ({
          isModalOpen:!prevState.isModalOpen
      }));
    };

    onWishlistClick = (id, hasSelectedPropertyId) => {
        const {
            isRemoving,
            isAdding,
            selectedPropertyId,
            addProperty,
            setSelectedListId
        } = this.props;

        setSelectedListId( {id: id } );

        if (isAdding || isRemoving) return;
        const propertyId = selectedPropertyId;
        const addOrRemove = hasSelectedPropertyId ? this.props.showModal('confirmDeleteFavourites') : addProperty;

        if(hasSelectedPropertyId ===false){
            addOrRemove({ id, propertyId })

        }else return
    };

    generateProps = () => ({
        ...this.state,
        ...this.props,
        onWishlistClick: this.onWishlistClick,
        setCreateListActive: this.setCreateListActive,
        handleCreateListSubmit: this.handleCreateListSubmit,
        handleCloseClick: this.handleCloseClick,
    });

    render() {
        const props = this.generateProps();
        return <AddPropertyModal {...props} />;
    }
}

const mapStateToProps = state => ({
    wishlists: wishlistSelectors.getLists(state),
    selectedPropertyId: wishlistSelectors.getSelectedPropertyId(state),
    isLoading: wishlistSelectors.getIsLoading(state),
    isAdding: wishlistSelectors.getIsAddingProperty(state),
    isRemoving: wishlistSelectors.getIsRemovingProperty(state),
});

const mapDispatchToProps = {
    fetchLists: wishlistActions.fetchLists,
    addProperty: wishlistActions.addProperty,
    removeProperty: wishlistActions.removeProperty,
    hideModal: modalActions.hideModal,
    handleCreateList: wishlistActions.createList,
    showModal:modalActions.showModal,
    setSelectedListId:wishlistActions.setSelectedListId
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(AddPropertyModalContainer);
