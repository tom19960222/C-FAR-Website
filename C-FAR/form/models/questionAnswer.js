var Sequelize = require('sequelize');

/*
    Types of questions:
        1. textbox
        2. textarea (allow mutiple lines)
        3. single choice (radiobutton)
        4. multiple choice (checkbox)
        5. dropdown menu
        6. score (N ~ M points)
*/

module.exports = function(sequelize){
    if(sequelize) {
        var questionAnswer = sequelize.define('questionAnswer', {
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
            dropdownMenu:{
                type: Sequelize.INTEGER
            },
            scoreMenu:{
                type: Sequelize.INTEGER
            },
            ansid: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            }
        });
        return questionAnswer;
    }
}