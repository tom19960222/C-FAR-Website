var db = require('../../db.js');
var Form = require('./form')(db);
var FormQuestion = require('./formQuestion')(db);
var QuestionAnswer = require('./questionAnswer')(db);

FormQuestion.hasMany(QuestionAnswer);
Form.hasMany(FormQuestion);

module.exports = {
    form: Form,
    formQuestion: FormQuestion,
    questionAnswer: QuestionAnswer
}