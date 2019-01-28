// Return an array of all methods on a component
// after binding them to "this"

// Methods which we do not want to return
// as they are part of the react lifecycle
const blacklist = [
    'constructor',
    'componentWillMount',
    'componentDidMount',
    'componentWillReceiveProps',
    'shouldComponentUpdate',
    'componentWillUpdate',
    'componentDidUpdate',
    'componentWillUnmount',
    'render',
    'generateProps',
];

export default (obj) => {
    const methods = Object.getOwnPropertyNames(Object.getPrototypeOf(obj));
    const filteredMethods = methods.filter(methodName => !blacklist.includes(methodName));

    return filteredMethods.reduce((reducedMethods, methodName) => {
        if (typeof obj[methodName] === 'function') {
            reducedMethods[methodName] = obj[methodName].bind(obj);
        }
        return reducedMethods;
    }, {});
};
