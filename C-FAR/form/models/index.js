var db = require('../../db.js');
var Form = require('./form')(db);
var FormQuestion = require('./formQuestion')(db);
var QuestionAnswer = require('./questionAnswer')(db);
var FormResponse = require('./formResponse.js')(db);
var User = require('../../user/models').User;

Form.belongsTo(User, {as: 'creator'});
User.hasMany(Form);

Form.hasMany(FormQuestion);
FormQuestion.belongsTo(Form);

FormQuestion.hasMany(QuestionAnswer);
QuestionAnswer.belongsTo(FormQuestion);

FormResponse.belongsTo(Form);
FormResponse.hasMany(QuestionAnswer);

module.exports = {
    form: Form,
    formQuestion: FormQuestion,
    questionAnswer: QuestionAnswer,
    formResponse: FormResponse
}