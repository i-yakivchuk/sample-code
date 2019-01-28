import { connect } from 'react-redux';
import FavouritesPagination from './FavouritesPagination';
import { actions as wishlistActions, selectors as wishlistSelectors } from '../../../../store/modules/Wishlist';


const mapStateToProps = state => ({
		activePage: wishlistSelectors.getCurrentPage(state) || 1,
		totalPages: wishlistSelectors.getTotalPages(state) || 1,
});

const mapDispatchToProps = dispatch => ({ dispatch });

const mergeProps = (state, { dispatch }) => {
		const setActivePage = (page) => {
				//dispatch(wishlistActions.setActivePage('enquiries', { page }));
				dispatch(wishlistActions.fetchLists({ page, pageSize: 50 }));
		};

		const onNextClick = () => {
				setActivePage(Math.min(state.activePage + 1, state.totalPages));
		};

		const onPrevClick = () => {
				setActivePage(Math.max(state.activePage - 1, 1));
		};

		return { ...state, setActivePage, onPrevClick, onNextClick };
};

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(FavouritesPagination);
