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
        var questionAnswer = sequelize.define('Answer', {
            textbox:{
                type: Sequelize.TEXT
            },
            textarea:{
                type: Sequelize.TEXT
            },
            singleChoice:{
                type: Sequelize.INTEGER
            },
            multipleChoice:{
                type: Sequelize.INTEGER
            },
            dropdown:{
                type: Sequelize.INTEGER
            },
            score:{
                type: Sequelize.INTEGER
            },
            ansid: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                unique: true
            }
        },
        {
            paranoid: true
        });
        return questionAnswer;
    }
}