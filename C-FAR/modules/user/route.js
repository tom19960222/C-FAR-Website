var Express = require('express');
var action = require('./action');
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
var passport = require('passport');

var needLogin = function(req, res, next){
    if(req.isAuthenticated())
        next();
    req.status(401).end();
}

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

router.post('/login', jsonParser, passport.authenticate('local'), function(req, res, next){
    res.status(200).json(req.user);
    // res.status(200).json({message: 'Login successed.'});
});

router.get('/logout', function(req, res){
    req.logout();
    res.status(200).json({message: 'Logout successed.'});
});

router.get('/login', function(req, res, next){
    if(!(req.body)) req.body = {};
    req.body.email = req.params.email;
    req.body.password = req.params.password;
    next();  
}, passport.authenticate('local'), function(req, res,next){
    res.status(200).send("<html><body><h1>You are now logged in as " + req.user.username + "</h1><a href='/user/now'>GO</a></body></html>");
});

router.get('/now', function(req, res){
    console.log(req.user);
    console.log(req.session);
    res.status(200).json(req.user);
});

module.exports = router;