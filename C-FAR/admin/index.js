var router = require('./route')();
var action = require('./action');
var inited = false;

var init = function(){
    inited = true;
}

module.exports.init = init;
module.exports.router = router;