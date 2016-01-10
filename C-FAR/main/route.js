var Express = require('express');

module.exports = function(router){
    
    router.use('/assets', Express.static(__dirname + '/public/assets'));
    
    router.get('/', function(req, res){
        res.sendFile(__dirname + '/pages/index.html');
    });

    router.get('/work', function(req, res){
        res.sendFile(__dirname + '/pages/work-page.html');
    });

    router.get('/story', function(req, res){
        res.sendFile(__dirname + '/pages/story-page.html');
    });

    router.get('/new-things', function(req, res){
        res.sendFile(__dirname + '/pages/something-new-page.html');
    });
}