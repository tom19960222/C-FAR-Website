var Express = require('express');
var router = require('./route.js')();
var inited = false;

module.exports.init = function(){
    inited = true;    
}
module.exports.router = router;