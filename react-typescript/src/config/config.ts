const env = {
    apiUrl: process.env.REACT_APP_API_URL || null,
    version: process.env.REACT_APP_API_VERSION || null,
    port: process.env.REACT_APP_API_PORT || null,
    socketUrl: process.env.REACT_APP_SOCKET_URL || null
};

export default env;
