var Model = require('./models');
var Form = Model.form;
var FormQuestion = Model.formQuestion;
var QuestionAnswer = Model.questionAnswer;
var FormResponse = Model.formResponse;
var User = require('../user/models').User;


var addForm = function(uid, title, description, questions){
    var newform;
    return Form.create({
        title: title,
        description: description
    })
    .then(function(_form){
        newform = _form;
        for(var i in questions){
            var newquestion = FormQuestion.build({
                title: questions[i].title,
                description: questions[i].description,
                questionType: questions[i].questionType,
                order: i
            })
            if(questions[i].questionType === 'singleChoice'){
                if(!newquestion.singleChoiceOptions)
                    newquestion.singleChoiceOptions = [];
                for(var o in questions[i].singleChoiceOptions)
                    newquestion.singleChoiceOptions.push(questions[i].singleChoiceOptions[o]);
                newquestion.singleChoiceOptions = JSON.stringify(newquestion.singleChoiceOptions);
            }
            else if(questions[i].questionType === 'multipleChoice'){
                if(!newquestion.multipleChoiceOptions)
                    newquestion.multipleChoiceOptions = [];
                for(var o in questions[i].multipleChoiceOptions)
                    newquestion.multipleChoiceOptions.push(questions[i].multipleChoiceOptions[o]);
                newquestion.multipleChoiceOptions = JSON.stringify(newquestion.multipleChoiceOptions);
            }
            else if(questions[i].questionType === 'dropdown'){
                if(!newquestion.dropdownOptions)
                    newquestion.dropdownOptions = [];
                for(var o in questions[i].dropdownOptions)
                    newquestion.dropdownOptions.push(questions[i].dropdownOptions[o]);
                newquestion.dropdownOptions = JSON.stringify(newquestion.dropdownOptions);
            }
            else if(questions[i].questionType === 'score'){
                newquestion.scoreMax = questions[i].scoreMax;
                newquestion.scoreMin = questions[i].scoreMin;
            }
            newquestion.setForm(newform).then(function(newquestion){return newquestion.save();});
            newform.addQuestion(newquestion).then(function(newform){return newform.save();});
        }
        return User.findById(uid).then(function(user){
                user.addForm(newform).then(function(user){return user.save();});
                return newform.setCreator(user).then(function(newform){return newform.save();});
            });
    });
}

var getForm = function(id){
    return Form.findById(id, {include: [
        {model: User, as: 'creator'},
        {model: FormQuestion}
    ]})
    .then(function(form){
        form.Questions.sort(function(a, b){
            return a.order - b.order;
        })
        return form;
    });
}

var getAllForms = function(){
    return Form.findAll();
}

var addAnswer = function(qid, answer, formResponse){
    var question;
    return FormQuestion.findById(qid)
    .then(function(_question){
        question = _question;
        var ans = QuestionAnswer.build();
        
        console.log(question.questionType);
        if(question.questionType === 'textbox')
            ans.textbox = answer;
        else if(question.questionType === 'textarea')
            ans.textarea = answer;
        else if(question.questionType === 'singleChoice')
            ans.singleChoice = answer;
        else if(question.questionType === 'multipleChoice')
            ans.multipleChoice = answer;
        else if(question.questionType === 'dropdown')
            ans.dropdown = answer;
        else if(question.questionType === 'score')
            ans.score = answer;
            
        return ans.save()
        .then(function(){
            return formResponse.addAnswer(ans).then(function(response){return response.save();})
            .then(function(){
                return question.addAnswer(ans).then(function(question){return question.save();});    
            })
            .then(function(){
                return ans.setQuestion(question).then(function(ans){return ans.save();});    
            })
        })
    });
}

// Code form: http://qiita.com/HitsujixTweet/items/cc9b731f4abe1e5bc45a
// More information: http://stackoverflow.com/questions/17217736/while-loop-with-promises
var Q = require("q");

// `condition` is a function that returns a boolean
// `body` is a function that returns a promise
// returns a promise for the completion of the loop
function promiseWhile(condition, body) {
    var done = Q.defer();

    function loop() {
        // When the result of calling `condition` is no longer true, we are
        // done.
        if (!condition()) return done.resolve();
        // Use `when`, in case `body` does not return a promise.
        // When it completes loop again otherwise, if it fails, reject the
        // done promise
        Q.when(body(), loop, done.reject);
    }

    // Start running the loop in the next tick so that this function is
    // completely async. It would be unexpected if `body` was called
    // synchronously the first time.
    Q.nextTick(loop);

    // The promise
    return done.promise;
}


// TODO: Add a check to ensure all question are in the form.
var answerForm = function(formId, answers){
    var q = require("q");
    var _resid;
    return Form.findById(formId)
    .then(function(form){
        var res = FormResponse.build({});
        return res.setForm(form)
        .then(function(ans){
            return ans.save()
            .then(function(){ 
                var i = -1; // Because we do i++ first, I start from -1.
                return promiseWhile(function () { return i < answers.length-1; }, function () {
                    i++;
                    return addAnswer(answers[i].qid, answers[i].answer, res);  
                })
                .then(function(){
                    return getResponse(ans.resid);
                })
                .catch(function(err){
                    console.error("Error answerForm - " + err);
                })
            })   
        })   
    })
}

var getQuestion = function(qid){
    return FormQuestion.findById(qid, {include: [ {all: true} ]});
}

var getResponse = function(resid){
    return FormResponse.findById(resid, {include: [ {all: true} ]});
}

module.exports.addForm = addForm;
module.exports.getForm = getForm;
module.exports.getAllForms = getAllForms;
module.exports.answerForm = answerForm;
module.exports.getQuestion = getQuestion;
module.exports.getResponse = getResponse;