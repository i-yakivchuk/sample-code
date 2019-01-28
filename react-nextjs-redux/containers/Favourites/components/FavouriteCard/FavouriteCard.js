import React from 'react';
import PropTypes from 'prop-types';
import applyStyles from 'next-style-loader/applyStyles';
import Link from 'next/link';
import cx from 'classnames';
import style from './style.scss';


const FavouriteCard = ({ id, title, slug, media = [], count }) => (
		<div key={`${id}-${Math.random().toString(36).substring(7)}`} className={cx(style.card, "col-xs-12 col-sm-6 col-md-4")}>
				<Link href={{ pathname: 'favouritesSingle', query: { slug } }} as={`/favourites/${slug}`}>
						<a>
								{ media.length && media[0]['src']
										? (<div style={{ backgroundImage: `url(${media[0]['src']})` }} className={style.image} />)
										: (<div className={style.placeholder} />)
								}
								<div className={style.details}>
										<span className={style.title}>{title}</span>
										<span className={style.subTitle}>{count} {count > 1 ? "properties" : "property"}</span>
								</div>
						</a>
				</Link>
		</div>
);

FavouriteCard.propTypes = {
		id: PropTypes.string,
		title: PropTypes.string.isRequired,
		count: PropTypes.number.isRequired,
		slug: PropTypes.string,
		media: PropTypes.arrayOf(PropTypes.object),
};

FavouriteCard.defaultProps = {
		media: [],
		count: 0
};

export default applyStyles(style)(FavouriteCard);
