import React from 'react';
import PropTypes from 'prop-types';
import PaginationBar from '../../../../component/PaginationBar';

const FavouritesPagination = ({
  activePage,
  totalPages,
  setActivePage,
  onNextClick,
  onPrevClick,
}) => (
		<PaginationBar
				activePage={activePage}
				onPrevClick={onPrevClick}
				onNextClick={onNextClick}
				onPageClick={setActivePage}
				totalPages={totalPages}
		/>
);

FavouritesPagination.propTypes = {
		activePage: PropTypes.number.isRequired,
		totalPages: PropTypes.number.isRequired,
		setActivePage: PropTypes.func.isRequired,
		onNextClick: PropTypes.func.isRequired,
		onPrevClick: PropTypes.func.isRequired,
};

export default FavouritesPagination;
