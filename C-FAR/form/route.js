var Express = require('express');
var action = require('./action');
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();

module.exports = function(){
    var router = Express.Router();
    
    router.use('/assets', Express.static(__dirname + '/public/assets'));
    
    router.post('/add', jsonParser, function(req, res, next){
        var ok = true;
        if(!(req.session.uid) || req.session.uid === 0){
            ok = false;
            res.status(401).end();
        }
            
        if(!(req.body.title)){
            ok = false;
            res.status(400).end();
        }
        if (ok) next();
    },
    function(req, res, next){
        action.addForm(req.session.uid, req.body.title, req.body.description, req.body.questions)
        .then(function(){
            res.status(201).json({message: 'Added form.'}).end();
            next();
        });
    });
    
    router.get('/', function(req, res){
        action.getAllForms()
        .then(function(forms){
            res.status(200).json(forms).end();    
        });
    });
    
    router.get('/:id', function(req, res){
        action.getForm(req.params['id'])
        .then(function(form){
           if(form) res.status(200).json(form);
           else res.status(404); 
        });
    });
    
    router.post('/answer/:id', jsonParser, function(req, res, next){
        action.answerForm(req.params['id'], req.body.answers);
        next();
    }, function(req, res){
        res.status(200).json({message: 'Answers added.'});
    });
    
    router.get('/question/:id', function(req, res){
        action.getQuestion(req.params['id'])
        .then(function(question){
            if (question) res.status(200).json(question);
            else res.status(404).end();
        })
        .catch(function(err){
            res.status(404);
        });
    })
    
    router.get('/response/:id', function(req, res){
        action.getResponse(req.params['id'])
        .then(function(response){
            res.status(200).json(response);
        })
        .catch(function(err){
            res.status(404);
        });
    })

    router.post('/edit', function(req, res){
        res.status(501).send("<h1>Not implemented</h1>");
    });
    
    router.post('/delete', function(req, res){
        res.status(501).send("<h1>Not implemented</h1>");
    });

    return router;
}