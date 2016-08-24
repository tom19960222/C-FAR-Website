import * as path from "path";
import {AppConfig} from "./typings/zuhzu/index";


export let appConfig: AppConfig = {
    renderPagePath: path.join(__dirname, 'pages'),
    listen: {address: '0.0.0.0', port: 3080},
    logType: 'combined',
    trust_proxy: 'loopback, uniquelocal',
    sessionStore: {host: 'redis', port: 6379},
    session: {
        secret: "ZuHzU",
        resave: false,
        saveUninitialized: true,
        cookie: {},
        name: 'zuhzu-session'
    },
    database: {
        sql: {
            type: 'mysql',
            host: 'mysql',
            port: 3306,
            username: 'root',
            password: 'zuhzu',
            dbname: 'zuhzu'
        }
    },
    staticStorage: path.normalize(path.join(__dirname, 'assets')),
    modules: [
        {
            name: 'test',
            route: '/',
            enable: false
        },
        {
            name: 'user',
            route: '/user',
            enable: true
        },
        {
            name: 'file',
            route: '/assets',
            enable: true
        },
        {
            name: 'images',
            route: '/image',
            enable: true
        },
        {
            name: 'message',
            route: '/message',
            enable: true
        },
        {
            name: 'news',
            route: '/news',
            enable: true
        },
        {
            name: 'member',
            route: '/member',
            enable: true
        },
        {
            name: 'main',
            route: '/',
            enable: true
        },
        {
            name: 'admin',
            route: '/admin',
            enable: true
        },
        {
            name: 'article',
            route: '/article',
            enable: true
        }
    ],
};