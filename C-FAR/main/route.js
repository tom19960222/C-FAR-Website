var Express = require('express');

module.exports = function(){
    var router = Express.Router();
    
    router.use('/assets', Express.static(__dirname + '/public/assets'));
    
    router.get('/', function(req, res){
        res.render('index');
    });

    router.get('/work', function(req, res){
        res.render('work-page');
    });

    router.get('/story', function(req, res){
        res.render('story-page');
    });

    router.get('/new-things', function(req, res){
        res.render('new-things-page');
    });

    router.get('/future', function(req, res){
        res.render('future-page');
    });

    router.get('/information', function(req, res){
        res.render('information-page');
    });
    
    return router;
}