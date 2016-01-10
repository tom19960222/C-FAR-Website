var Express = require('express');
var router_init = require('./route.js');
var moduleRouter = Express.Router();

router_init(moduleRouter);
module.exports.router = moduleRouter;
