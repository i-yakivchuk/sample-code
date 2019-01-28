// Global env loaded from 'config.client.js' on server
const env = typeof window !== 'undefined' ? window.clientEnv : process.clientEnv;

export default env;
