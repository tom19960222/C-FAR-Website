var Sequelize = require('sequelize');

/*
    Types of questions:
        1. textbox (textbox)
        2. textarea (textarea (allow mutiple lines))
        3. singleChoice (single choice (radiobutton))
        4. multipleChoice (multiple choice (checkbox))
        5. dropdown (dropdown menu)
        6. score (score (N ~ M points))
*/

module.exports = function(sequelize){
    if(sequelize) {
        var FormQuestion = sequelize.define('FormQuestion', {
            title: {
                type: Sequelize.STRING,
                allowNull: false
            },
            description: {
                type: Sequelize.TEXT
            },
            questionType: {
                type: Sequelize.STRING
            },
            singleChoiceOptions:{
                type: Sequelize.TEXT // JSON Array
            },
            multipleChoiceOptions:{
                type: Sequelize.TEXT // JSON Array
            },
            dropdownOptions:{
                type: Sequelize.TEXT // JSON Array
            },
            scoreMax:{
                type: Sequelize.INTEGER
            },
            scoreMin:{
                type: Sequelize.INTEGER
            },
            qid: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            }
        });
        return FormQuestion;
    }
}