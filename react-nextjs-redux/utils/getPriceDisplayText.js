import config from '../config';

const { translations } = config;

const ppcmPrice = ({
    price,
    priceLabel,
    bedrooms,
}) => {
    let normal = price;

    switch (priceLabel) {
        case 'pcm':
            normal = price / bedrooms;
            break;
        case 'pppw':
        case 'ppcw':
            normal = price * 4.333333;
            break;
        case 'pcw':
            normal = (price * 4.333333) / bedrooms;
            break;
        case 'ppa':
            normal = price / 12;
            break;
        case 'pa':
            normal = price / 12 / bedrooms;
            break;
    }

    return parseInt(normal);
};

export default ({
    price,
    priceLabel,
    bedrooms,
    hideLabel
}) => (
    (ppcmPrice({ price, priceLabel, bedrooms }) < 200)
        ? <span>£{translations.noPrice}</span>
        : <span>£{parseInt(price)} <span>{ hideLabel ? '' : priceLabel }</span></span>
);
