/// <reference path="typings/node/node.d.ts" />
/// <reference path="typings/express/express.d.ts" />
/// <reference path="typings/body-parser/body-parser.d.ts" />
/// <reference path="typings/sequelize/sequelize.d.ts" />

var Express = require('express');
var app = Express();
var c_far = require('./C-FAR');
var config = require('./config');


app.use('/', c_far.router);

app.listen(config.listen.port, function(){
    console.log("Server started at port " + config.listen.port);
});