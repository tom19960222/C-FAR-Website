var Model = require('./models');
var Express = require('express');
var router = require('./route')();
var inited = false;
var model;

var init = function(sequelize){
    model = Model(sequelize);
    sequelize.sync();
    inited = true;
}

module.exports.init = init;
module.exports.router = router;