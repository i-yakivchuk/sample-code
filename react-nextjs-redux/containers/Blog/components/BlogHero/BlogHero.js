import React from 'react';
import applyStyles from 'next-style-loader/applyStyles';
import style from './style.scss';

const BlogHero = () => (
    <div className={style.hero}>
        <div className="container-fluid">
            <div className="row">
                <div className="col-xs-12 center-xs">
                    <h1 className={style.title}>Blogs</h1>
                </div>
            </div>
        </div>
    </div>
);

export default applyStyles(style)(BlogHero);
