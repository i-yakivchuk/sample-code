import React from 'react';
import { connect } from 'react-redux';
import FavouritesScreen from './FavouritesScreen';
import { actions as wishlistActions, selectors as wishlistSelectors } from '../../../../store/modules/Wishlist';
import uuidv4 from 'uuid/v4';
import isEmptyString from 'validator/lib/isEmpty';


class FavouritesScreenContainer extends React.Component {
    state = {
        isCreateListActive: false,
        createError: false,
    };

    componentDidMount() {
        this.props.fetchLists();
    }


    handleCreateListSubmit = (body) => {
        const { name } = body;
        if (name && !isEmptyString(name, { ignore_whitespace: true })) {
            this.props.handleCreateList({ id: uuidv4(), title: name }).then( () => {
                this.setCreateListActive(false);
                this.props.fetchLists();
            });
        } else {
            this.setState({ createError: true });
        }
    };


    setCreateListActive = (active) => {
        this.setState({ isCreateListActive: active, createError: false });
    };

    generateProps() {
        return {
            ...this.props,
            ...this.state,
            handleCreateListSubmit: this.handleCreateListSubmit,
            setCreateListActive: this.setCreateListActive,
        };
    }

    render() {
        const props = this.generateProps();
        return <FavouritesScreen {...props} />;
    }
}

const mapStateToProps = state => ({
    lists: wishlistSelectors.getLists(state),
});

const mapDispatchToProps = {
    fetchLists: wishlistActions.fetchLists,
    handleCreateList: wishlistActions.createList,
    fetchListProperties: wishlistActions.fetchListProperties,
};

export default connect(mapStateToProps, mapDispatchToProps)(FavouritesScreenContainer);
