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
    },
    {
        name: 'form',
        route: '/form'
    }
]

// Margan is used to be logger, visit here to get more info:
// https://github.com/expressjs/morgan
config.logType = 'dev';

config.sessionStore = {
    host: '163.13.128.116',
    port: 6379
}

config.session = {
    secret: "c-fAr",
    resave: false,
    saveUninitialized: true,
    cookie: {},
    name: 'c-far-session',
}

config.database = {
    type: 'mysql',
    host: 'mysql',
    port: 3306,
    username: 'admin',
    password: 'password',
    dbname: 'c-far'
}

if(process.env.NODE_ENV === 'production'){
    config.session.cookie.secure = true;
}
    