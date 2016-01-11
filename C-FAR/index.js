var Express = require('express');
var config = require('./config');
var mainRouter = Express.Router();
var modules = [];

module.exports.router = mainRouter;

for (var m in config.active_modules){
    var mod = require(__dirname + '/' + config.active_modules[m].name);
    mainRouter.use(config.active_modules[m].route, mod.router);
    modules.push(mod);
    console.log("Loaded module " + config.active_modules[m].name + ", mounted at " + config.active_modules[m].route);
}