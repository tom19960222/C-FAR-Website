var Model = require('./models');
var Form = Model.form;
var FormQuestion = Model.formQuestion;
var QuestionAnswer = Model.questionAnswer;
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
            User.findById(uid).then(function(user){
                newform.setCreator(user).then(function(newform){newform.save();});
                user.addForm(newform).then(function(user){user.save();});
            });
        }
    });
}

var getForm = function(id){
    return Form.findById(id, {include: [
        {model: User, as: 'creator'},
        {model: FormQuestion}
    ]})
    .then(function(form){
        return form.Questions.sort(function(a, b){
            return a.order - b.order;
        })
    });
}

var getAllForms = function(){
    return Form.findAll();
}

module.exports.addForm = addForm;
module.exports.getForm = getForm;
module.exports.getAllForms = getAllForms;