/// <reference path="../typings/node/node.d.ts" />
/// <reference path="../typings/express/express.d.ts" />
/// <reference path="../typings/express-session/express-session.d.ts" />

var Express = require('express');
var config = require('./config');
var mainRouter = Express.Router();
var modules = [];
var db = require('./db');
var session = require('express-session');

module.exports.router = mainRouter;
mainRouter.use(session(config.session));

for (var m in config.active_modules){
    var mod = require(__dirname + '/' + config.active_modules[m].name);
    mod.init();
    mainRouter.use(config.active_modules[m].route, mod.router);
    modules.push(mod);
    console.log("Loaded module " + config.active_modules[m].name + ", mounted at " + config.active_modules[m].route);
}

// db.query('SET FOREIGN_KEY_CHECKS = 0')
// .then(function(){
//     return db.sync({ force: true, logging: console.log });
// })
// .then(function(){
//     return db.query('SET FOREIGN_KEY_CHECKS = 1')
// })

// db.sync({force: false}); // Sync database schema after loaded all the modules.