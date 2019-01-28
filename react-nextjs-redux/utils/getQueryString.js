import qs from 'qs';

export default () => {
    const str = global.window && global.window.location.search.replace('?', '');
    return qs.parse(str);
};
