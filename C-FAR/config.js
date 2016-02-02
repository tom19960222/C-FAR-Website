var path = require('path');
var config = {}
module.exports = config;

config.active_modules = {
    staticFile: {
        route: '/static'  
    },
    main: {
        route: '/'
    },
    user: {
        route: '/user'
    },
    form: {
        route: '/form'
    },
    admin: {
        route: '/admin'
    },
    article: {
        route: '/article'
    }
}

config.sessionStore = {
    host: 'local.docker',
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

config.staticStorage = path.normalize(path.join(__dirname, 'assets'));
// if(process.env.NODE_ENV === 'production'){
//     config.session.cookie.secure = true;
// }
    