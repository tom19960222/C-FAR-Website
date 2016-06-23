var Express = require('express');
var Path = require('path');
var router = Express.Router();
    
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

router.get('/form', function(req, res){
    res.render('form-page');
});

router.get('/one', function(req, res){
    res.render('future1');
});

router.get('/two', function(req, res){
    res.render('future2');
});

router.get('/three', function(req, res){
    res.render('future3');
});

router.get('/four', function(req, res){
    res.render('future4');
});

router.get('/five', function(req, res){
    res.render('future5');
});

router.get('/six', function(req, res){
    res.render('future6');
});

router.get('/seven', function(req, res){
    res.render('future7');
});

router.get('/eight', function(req, res){
    res.render('future8');
});

router.get('/nine', function(req, res){
    res.render('future9');
});

router.get('/ten', function(req, res){
    res.render('future10');
});



router.get('/error', function(req, res){
    res.render('error');
});

router.get('/login', function(req, res){
    res.render('login');
});

router.get('/manage', function(req, res){
    res.render('manage');
});

router.get('/meeting', function(req, res){
    res.render('meeting');
});

module.exports = router;