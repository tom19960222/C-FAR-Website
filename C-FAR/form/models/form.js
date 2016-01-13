/// <reference path="../../../typings/sequelize/sequelize.d.ts" />

var Sequelize = require('sequelize');

module.exports = function(sequelize){
    if(sequelize) {
        var Form = sequelize.define('Form', {
            title: {
                type: Sequelize.STRING,
                allowNull: false
            },
            description: {
                type: Sequelize.STRING
            }
        });
        
        return Form;
    }
}