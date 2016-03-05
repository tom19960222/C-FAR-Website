/// <reference path="../../../typings/node/node.d.ts" />
/// <reference path="../../../typings/sequelize/sequelize.d.ts" />
/// <reference path="../../../typings/express/express.d.ts" />

var model = require('./models');
var User = model.User;

// username, email, password, permission is required.

var addUser = function(firstName, lastName, username, email, password, permission, language){
    
    firstName = firstName || '';
    lastName = lastName || '';
    permission = permission || 1;
    language = language || 'zh-tw';
    
    return User.create({
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

var editUser = function(uid, firstName, lastName, username, email, password, permission, language){
    return User.findById(uid)
    .then(function(user){
       if(firstName) user.firstName = firstName;
       if(lastName) user.lastName = lastName;
       if(email) user.email = email;
       if(password) user.password = password;
       if(permission) user.permission = permission;
       if(language) user.language = language;
       return user.save()
       .catch(function(err){
           console.error('Edit user failed - ' + err);
       });
    })
    .catch(function(err){
        console.error('Edit user failed - ' + err);
    });
}

var getUserById = function(uid){
    return User.findById(uid);
}

var getUserByEmail = function(email){
    return User.findOne({
        where:{
            email: email
        }
    })
}

var login = function(username, password){
    return User.findOne({
        where: 
        {
            $or:
            [
                { $and: [{username: username}, {password: password}] },
                { $and: [{email: username}, {password: password}] }
            ]
        }
    })
    .catch(function(err){
        console.error("Login failed - " + err);
    });
}

module.exports.addUser = addUser;
module.exports.editUser = editUser;
module.exports.login = login;
module.exports.getUserById = getUserById;
module.exports.getUserByEmail = getUserByEmail;