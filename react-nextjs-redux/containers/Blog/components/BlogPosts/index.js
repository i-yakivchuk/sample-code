import { connect } from 'react-redux';
import { selectors as blogSelectors } from '../../../../store/modules/Blog';
import BlogPosts from './BlogPosts';

const mapStateToProps = state => ({
    posts: blogSelectors.getFilteredPosts(state),
    activePage: blogSelectors.getActivePostPage(state),
});

export default connect(mapStateToProps)(BlogPosts);
