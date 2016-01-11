/// <reference path="../../../typings/node/node.d.ts" />
/// <reference path="../../../typings/sequelize/sequelize.d.ts" />

var Sequelize = require('sequelize');
var User;

/*
    VARCHAR firstName
    VARCHAR lastName
    VARCHAR usermame
    VARCHAR email
    VARCHAR password
    INTEGER permission // 0: Anonymous 1: normal user 2: admin
    INTEGER uid // PK
*/

module.exports = function(sequelize){
    if(sequelize) {
        var User = sequelize.define('user', {
            firstName: {
                type: Sequelize.STRING
            },
            lastName: {
                type: Sequelize.STRING
            },
            username: {
                type: Sequelize.STRING  
            },
            email: {
                type: Sequelize.STRING
            },
            password: {
                type: Sequelize.STRING      
            },
            permission: {
                type: Sequelize.INTEGER
            },
            last_access: {
                type: Sequelize.DATE  
            },
            last_login: {
                type: Sequelize.DATE
            },
            locked: {
                type: Sequelize.BOOLEAN  
            },
            language: {
                type: Sequelize.STRING  
            },
            uid: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            }
        });   
    }
    return User;
}