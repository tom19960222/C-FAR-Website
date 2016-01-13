var db = require('../../db.js');
var Form = require('./form')(db);
var FormQuestion = require('./formQuestion')(db);
var QuestionAnswer = require('./questionAnswer')(db);
var User = require('../../user/models').User;

Form.belongsTo(User, {as: 'creator'});
User.hasMany(Form);

Form.hasMany(FormQuestion);
FormQuestion.belongsTo(Form);

FormQuestion.hasMany(QuestionAnswer);
QuestionAnswer.belongsTo(FormQuestion);

module.exports = {
    form: Form,
    formQuestion: FormQuestion,
    questionAnswer: QuestionAnswer
}