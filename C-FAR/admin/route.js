var Express = require('express');
var action = require('./action');
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();

module.exports = function(){
    var router = Express.Router();
    
    router.use('/assets', Express.static(__dirname + '/public/assets'));
    
    router.get('/action/restart', function(req, res, next){
        var ok = true;
        if (req.session.uid === undefined || req.session.uid === 0){
            res.status(403).json({message: 'You have no permission to do it.'}).end();
            ok = false;
        }
        if(ok) next();
    }, function(req, res){
        action.restartWebsite()
        .then(function(){
            res.status(200).json({message: 'Starting to restart system, please wait a minute...'});
        })
        .catch(function(err){
            res.status(500).json({message: 'Failed to restart system.'});
        })
    });
    
    return router;
}();