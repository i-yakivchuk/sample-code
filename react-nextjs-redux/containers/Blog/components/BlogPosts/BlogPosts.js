import React from 'react';
import applyStyles from 'next-style-loader/applyStyles';
import style from './style.scss';

import SVG from '../../../../component/SVG';
import ArticleCard from '../../../../component/ArticleCard';
import PaginatedList from '../../../../component/PaginatedList';

const BlogPosts = ({
    posts,
    activePage,
}) => (
    <div className={style.posts}>
        {posts.length ? (
            <PaginatedList
                className={style.listItems}
                pageSize={5}
                page={activePage}
                items={posts}
                renderItem={(post) => (
                    <li key={post.id}>
                        <ArticleCard
                            title={post.title}
                            body={post.excerpt || post.content}
                            image={post.featured_image || null}
                            slug={post.slug}
                            date={post.date}
                            categories={post.categories}
                        />
                    </li>
                )}
            />
        ) : (
            <div className={style.none}>
                <SVG icon="facesad" className="icon facesad small inline" />
                No results found
            </div>
        )}
    </div>
);

export default applyStyles(style)(BlogPosts);
