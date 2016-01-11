/// <reference path="typings/node/node.d.ts" />
/// <reference path="typings/express/express.d.ts" />
/// <reference path="typings/body-parser/body-parser.d.ts" />
/// <reference path="typings/sequelize/sequelize.d.ts" />
/// <reference path="typings/morgan/morgan.d.ts" />

var Express = require('express');
var app = Express();
var c_far = require('./C-FAR');
var config = require('./config');
var logger = require('morgan');
var helmet = require('helmet');

app.use(logger(config.logType));

// Use helmet to prevent some common attack.
app.use(helmet.xssFilter());
app.use(helmet.frameguard('sameorigin'));
app.use(helmet.hidePoweredBy());
app.use(helmet.ieNoOpen());
app.use(helmet.noSniff());

app.use('/', c_far.router);


app.listen(config.listen.port, function(){
    console.log("Server started at port " + config.listen.port);
});