var config = {}
module.exports = config;

config.active_modules = [
    {
        name: 'staticFile',
        route: '/static'  
    },
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
    },
    {
        name: 'admin',
        route: '/admin'
    }
]

config.sessionStore = {
    host: 'redis',
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

// if(process.env.NODE_ENV === 'production'){
//     config.session.cookie.secure = true;
// }
    