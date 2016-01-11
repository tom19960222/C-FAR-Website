var Express = require('express');

module.exports = function(){
    var router = Express.Router();
    
    router.use('/assets', Express.static(__dirname + '/public/assets'));
    
    router.post('/add', function(req, res){
        res.status(501).write("Not implemented");
    });

    router.get('/detail', function(req, res){
        res.status(501).write("Not implemented");
    });

    router.get('/edit', function(req, res){
        res.status(501).write("Not implemented");
    });
    
    router.get('/delete', function(req, res){
        res.status(501).write("Not implemented");
    });

    router.post('/login', function(req, res){
        res.status(501).write("Not implemented");
    });
    
    router.get('/logout', function(req, res){
        res.status(501).write("Not implemented");
    });
    
    return router;
}