import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { selectors as blogSelectors, actions as blogActions } from '../../../../store/modules/Blog';
import PaginationBar from '../../../../component/PaginationBar';
import getComponentMethods from '../../../../utils/getComponentMethods';

class PaginationBarContainer extends React.PureComponent {
    constructor() {
        super();

        this.methods = getComponentMethods(this);
    }

    onNextClick() {
        const nextPage = this.props.activePage + 1;
        if (nextPage <= this.props.totalPages) {
            this.props.changePage(nextPage);
        }
    }

    onPrevClick() {
        const prevPage = this.props.activePage - 1;
        if (prevPage > 0) {
            this.props.changePage(prevPage);
        }
    }

    onPageClick(newPage) {
        this.props.changePage(newPage);
    }

    generateProps() {
        return {
            ...this.props,
            ...this.methods,
        };
    }

    render() {
        const props = this.generateProps();
        return <PaginationBar {...props} />;
    }
}

PaginationBarContainer.propTypes = {
    activePage: PropTypes.number,
    totalPages: PropTypes.number,
    changePage: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    activePage: blogSelectors.getActivePostPage(state),
    totalPages: blogSelectors.getTotalPages(state),
    displayRange: 6,
});

const mapDispatchToProps = dispatch => ({
    changePage(page) {
        dispatch(blogActions.setActivePostPage('posts', { page }));
        dispatch(blogActions.fetchPosts('posts', { page, limit: 5 }));
    },
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(PaginationBarContainer);
