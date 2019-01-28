import { connect } from 'react-redux';
import { actions as blogActions } from '../../../../store/modules/Blog';
import BlogSearch from './BlogSearch';

const mapDispatchToProps = dispatch => ({
    handleSearch({ searchValue = '' }) {
        dispatch(blogActions.setSearchValue('posts', { search: searchValue.toLowerCase() }));
        dispatch(blogActions.fetchPosts('posts', { page: 1, search: searchValue }));
    },
});

export default connect(
    null,
    mapDispatchToProps,
)(BlogSearch);
