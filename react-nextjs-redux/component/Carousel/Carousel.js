import React from 'react';
import PropTypes from 'prop-types';
import applyStyles from 'next-style-loader/applyStyles';
import cx from 'classnames';
import ReactCarousel from 'nuka-carousel';
import style from './style.scss';

import SVG from '../SVG';

const DefaultDecorators = [{
    component: (props) => {
        const bars = [];
        for (let i = 0; i < props.slideCount; i++) {
            bars.push(
                <span
                    key={`bar${i}`}
                    className={cx(style.bar, props.currentSlide === i && style.activeBar)}
                    onClick={() => props.goToSlide(i)}
                />
            );
        }

        return ([
            <span key="bars" className={style.navigation}>{bars}</span>,
            <span key="previous" className={style.previous} onClick={() => props.previousSlide()}><SVG icon="angleleft" className="icon angleleft" /></span>,
            <span key="next" className={style.next} onClick={() => props.nextSlide()}><SVG icon="angleright" className="icon angleright" /></span>,
        ]);
    },
    position: 'TopLeft',
    style: {
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
    },
}];

const Carousel = ({
    images,
    decorators,
    customClasses,
}) => (
    <div className={cx(style.carousel, customClasses.carousel)}>
        <ReactCarousel decorators={decorators} style={{ height: '100%' }}>
            {images.map(({ src, alt }, i) => (
                <div key={`${src}`} className={cx(style.image, customClasses.image)} style={{ backgroundImage: `url("${src}?w=500&h=300")` }}/>
            ))}
        </ReactCarousel>
    </div>
);

Carousel.propTypes = {
    images: PropTypes.arrayOf(PropTypes.object).isRequired,
    decorators: PropTypes.array,
    customClasses: PropTypes.object,
};

Carousel.defaultProps = {
    images: [],
    decorators: DefaultDecorators,
    customClasses: {},
};

export default applyStyles(style)(Carousel);
