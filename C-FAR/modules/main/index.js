var Express = require('express');
var router = require('./route.js');
var staticFile = require('../staticFile');
var inited = false;

module.exports.init = function(){
    staticFile.register('/main', 'main', false)
    inited = true;    
}
module.exports.router = router;