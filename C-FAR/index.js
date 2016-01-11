var Express = require('express');
var config = require('./config');
var mainRouter = Express.Router();
var modules = [];
var Sequelize = require('sequelize');
var sequelize = new Sequelize('c-far', 'root', '123456@', {
  host: '192.168.99.100',
  dialect: 'mysql',

  pool: {
    max: 5,
    min: 0,
    idle: 10000
  },
});

module.exports.router = mainRouter;

for (var m in config.active_modules){
    var mod = require(__dirname + '/' + config.active_modules[m].name);
    mod.init(sequelize);
    mainRouter.use(config.active_modules[m].route, mod.router);
    modules.push(mod);
    console.log("Loaded module " + config.active_modules[m].name + ", mounted at " + config.active_modules[m].route);
}
