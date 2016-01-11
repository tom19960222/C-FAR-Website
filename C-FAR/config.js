var config = {}
module.exports = config;

config.active_modules = [
    {
        name: 'main',
        route: '/'
    },
    {
        name: 'user',
        route: '/user'
    }
]

// Margan is used to be logger, visit here to get more info:
// https://github.com/expressjs/morgan
config.logType = 'dev';