/// <reference path="../../../typings/sequelize/sequelize.d.ts" />

var Sequelize = require('sequelize');

module.exports = function(sequelize){
    if(sequelize) {
        var FormResponse = sequelize.define('FormResponse', {
            resid: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            }
        });
        return FormResponse;
    }
}