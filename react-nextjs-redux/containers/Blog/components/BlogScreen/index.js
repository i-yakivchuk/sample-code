import { connect } from 'react-redux';
import { selectors as blogSelectors } from '../../../../store/modules/Blog';
import BlogScreen from './BlogScreen';

const mapStateToProps = state => ({
    fetchStatus: blogSelectors.getFetchStatus(state),
});

export default connect(mapStateToProps)(BlogScreen);
