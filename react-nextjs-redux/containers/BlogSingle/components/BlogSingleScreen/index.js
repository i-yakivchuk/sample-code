import { connect } from 'react-redux';
import BlogSingleScreen from './BlogSingleScreen';
import { selectors as blogSelectors } from '../../../../store/modules/Blog';

const mapStateToProps = state => ({
    post: blogSelectors.getActivePost(state) || {},
});

export default connect(mapStateToProps)(BlogSingleScreen);
