/// <reference path="../typings/assert/assert.d.ts" />
/// <reference path="../typings/mocha/mocha.d.ts" />

// module.exports.addForm = addForm;
// module.exports.getForm = getForm;
// module.exports.getAllForms = getAllForms;
// module.exports.addAnswer = addAnswer;
// module.exports.answerForm = answerForm;
// module.exports.getQuestion = getQuestion;
// module.exports.getResponse = getResponse;

var formAction = require('../C-FAR/form/action.js');
var assert = require('assert');

describe('Form#addForm', function(){
    it('should add a form', function(done){
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
        
        formAction.addForm(1, 'Test form', 'This is a this form', questions)
        .then(function(addedform){
            formAction.getForm(addedform.id)
            .then(function(foundform){
                assert.equal(foundform.Questions.length, 6);
                done();
            })
        })
    })
});