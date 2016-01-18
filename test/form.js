/// <reference path="../typings/assert/assert.d.ts" />
/// <reference path="../typings/mocha/mocha.d.ts" />


var formAction = require('../C-FAR/form/action.js');
var assert = require('assert');

var questions = [
            {
                title: 'Q01',
                description: 'This is Q01',
                questionType: 'textbox'
            },
            {
                title: 'Q02',
                description: 'This is Q02',
                questionType: 'textarea'
            },
            {
                title: 'Q03',
                description: 'This is Q03',
                questionType: 'singleChoice',
                singleChoiceOptions: [
                    "Opt01", "Opt02", "Opt03"
                ]
            },
            {
                title: 'Q04',
                description: 'This is Q04',
                questionType: 'multipleChoice',
                multipleChoiceOptions: [
                    "Opt01", "Opt02", "Opt03"
                ]
            },
            {
                title: 'Q05',
                description: 'This is Q05',
                questionType: 'dropdown',
                dropdownOptions: [
                    "Opt01", "Opt02", "Opt03"
                ]
            },
            {
                title: 'Q06',
                description: 'This is Q06',
                questionType: 'score',
                scoreMax: 10,
                scoreMin: 1
            },
        ];

var answers = [
    { textbox: 'YEE' },
    { textarea: 'YEEEE\nYEEEEEEEEEE'},
    { singleChoice: 1},
    { multipleChoice: [0, 2]},
    { dropdown: 1},
    { score: 5}
];

describe('Form#addForm', function(){
    it('should add a form', function(done){ 
        formAction.addForm(1, 'Test form', 'This is a this form', questions)
        .then(function(addedform){
            formAction.getForm(addedform.id)
            .then(function(foundform){
                assert.equal(foundform.Questions.length, 6);
                assert.equal(foundform.Questions[0].questionType, 'textbox');
                assert.equal(foundform.Questions[1].questionType, 'textarea');
                assert.equal(foundform.Questions[2].questionType, 'singleChoice');
                assert.equal(foundform.Questions[3].questionType, 'multipleChoice');
                assert.equal(foundform.Questions[4].questionType, 'dropdown');
                assert.equal(foundform.Questions[5].questionType, 'score');
                done();
            })
        })
    })
});

describe('Form#getForm', function(){
    it('should return form where id=1', function(done){
        formAction.getForm(1)
        .then(function(foundform){
            assert.equal(foundform.id, 1);
            done();
        })
    })
});

describe('Form#getAllForms', function(){
    it('should return all of the form', function(done){
        formAction.getAllForms()
        .then(function(foundforms){
            for (var i in foundforms)
                assert.notEqual(foundforms[i].title, undefined);
            done();
        })
    })
});

describe('From#getResponse', function(){
    it('should return response resid=1', function(done){
        formAction.getResponse(1)
        .then(function(response){
            assert.equal(response.resid, 1);
            done();
        })
    })
})

describe('Form#answerForm', function(){
    var newformid;
    
    it('should return all of the answer passed to function', function(done){
        return formAction.addForm(1, 'Test form', 'This is a this form', questions)
        .then(function(newform){
            return formAction.getForm(newform.id)
            .then(function(newform){
                for(var i in newform.Questions)
                    answers[i].qid = newform.Questions[i].qid;
                return formAction.answerForm(newformid, answers)
                .then(function(response){
                    assert.equal(response.Answers.length, 6);
                    done();
                })    
            })
            
        })
    })
});

describe('Form#getQuestion', function(){
    it('should return question qid=1', function(done){
        return formAction.getQuestion(1)
        .then(function(question){
            assert.equal(question.qid, 1);
            return done();
        })
    })
});