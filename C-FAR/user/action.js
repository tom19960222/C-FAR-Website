/// <reference path="../../typings/node/node.d.ts" />
/// <reference path="../../typings/sequelize/sequelize.d.ts" />

var model = require('./models');
var User = model.User;

// username, email, password, permission is required.

var addUser = function(firstName, lastName, username, email, password, permission, language){
    
    firstName = firstName || '';
    lastName = lastName || '';
    permission = permission || 1;
    language = language || 'zh-tw';
    
    User.create({
        firstName: firstName,
        lastName: lastName,
        username: username,
        email: email,
        password: password,
        permission: permission, 
        language: language,
        locked: false
    })
    .catch(function(err){
        console.log("Add user failed - " + err);  
        throw(err);
    });
}

module.exports.addUser = addUser;