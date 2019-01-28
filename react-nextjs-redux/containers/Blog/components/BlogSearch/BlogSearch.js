import React from 'react';
import PropTypes from 'prop-types';
import applyStyles from 'next-style-loader/applyStyles';
import cx from 'classnames';
import style from './style.scss';

import SVG from '../../../../component/SVG';
import { Input } from '../../../../component/Fields';
import Form from '../../../../component/Form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const BlogSearchForm = Form('blog-search');

const BlogScreen = ({
    handleSearch,
}) => (
    <BlogSearchForm onSubmit={handleSearch} renderButtons={false}>
        <div className={style.searchWrapper}>
            <Input name="searchValue" placeholder="Search articles" className={style.input} />
		        <FontAwesomeIcon color={'red'} className={style.icon} icon="search" />
        </div>
    </BlogSearchForm>
);

BlogScreen.propTypes = {
    handleSearch: PropTypes.func.isRequired,
};

export default applyStyles(style)(BlogScreen);
