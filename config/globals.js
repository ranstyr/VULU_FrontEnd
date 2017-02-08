var appEnv = process.env.NODE_ENV || 'development';
var appConfig = require('./config');
appConfig = appConfig[appEnv] || appConfig.development;

module.exports = {
    __ENV: {
        localhost: appEnv === 'localhost',
        development: appEnv === 'development',
        testing: appEnv === 'testing',
        staging: appEnv === 'staging',
        bt: appEnv === 'bt',
        production: appEnv === 'production'
    },
    __API_URL: JSON.stringify(appConfig.API_URL),
};
