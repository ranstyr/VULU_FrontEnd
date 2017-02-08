var appEnv = process.env.NODE_ENV || 'development';
var appConfig = require('./config/config');
appConfig = appConfig[appEnv] || appConfig.development;

module.exports = {
    __ENV: {
        development: appEnv === 'development',
        production: appEnv === 'production',
        test: appEnv === 'testing',
        mobile: appEnv === 'mobile'
    },
    __API_URL: JSON.stringify(appConfig.API_URL)
};