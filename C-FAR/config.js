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
    // {
    //     name: 'form',
    //     route: '/form'
    // }
]

// Margan is used to be logger, visit here to get more info:
// https://github.com/expressjs/morgan
config.logType = 'dev';

config.session = {
    secret: "c-fAr",
    resave: false,
    saveUninitialized: true,
    cookie: {},
    name: 'c-far-session'
}

if(process.env.NODE_ENV === 'production'){
    config.session.cookie.secure = true;
}
    