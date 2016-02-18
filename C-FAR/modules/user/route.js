var Express = require('express');
var action = require('./action');
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();

module.exports = function(){
    var router = Express.Router();
    
    router.use('/assets', Express.static(__dirname + '/public/assets'));
    
    router.post('/add', jsonParser, function(req, res, next){
        var body = req.body;
        action.addUser(body.firstName, body.lastName, body.username, body.email, body.password, body.permission, body.language)
        .then(function(user){
            res.status(201).json({message: 'User added.'});
        })
        .error(function(err){
            res.status(500).json({message: 'User add failed - ' + err});
        })
    });

    router.get('/detail', function(req, res){
        res.status(501).send("<h1>Not implemented</h1>");
    });

    router.post('/edit', function(req, res){
        res.status(501).send("<h1>Not implemented</h1>");
    });
    
    router.post('/delete', function(req, res){
        res.status(501).send("<h1>Not implemented</h1>");
    });

    router.post('/login', jsonParser, function(req, res, next){
        action.login(req.body.username, req.body.password)
        .then(function(user){
            if(user) {
                req.session.uid = user.uid;
                req.session.permission = user.permission;
                res.status(200).json({message: 'Login successed.'});
            }
            else {
                req.session.uid = 0;
                req.session.permission = 0;
                res.status(403).json({message: 'Username or password is wrong.'});
            }
        })
    });
    
    router.get('/logout', function(req, res){
        req.session.uid = 0;
        req.session.permission = 0;
        res.status(200).json({message: 'Logout successed.'});
    });
    
    return router;
}();