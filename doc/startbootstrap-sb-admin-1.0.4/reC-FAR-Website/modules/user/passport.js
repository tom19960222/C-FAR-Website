"use strict";
const passport = require('passport');
const passport_local_1 = require('passport-local');
const action = require('./action');
passport.serializeUser((user, done) => {
    return action.getUserById(user.user_id)
        .then(function (user) {
        return done(null, user);
    });
});
passport.deserializeUser((user, done) => {
    return done(null, user);
});
passport.use('local', new passport_local_1.Strategy({
    usernameField: 'email',
    passwordField: 'password',
}, (email, password, done) => {
    return action.getUserByEmail(email, true)
        .then(function (user) {
        if (!user)
            return done(null, false);
        if (!(user.validatePassword(password)))
            return done(null, false);
        user = action.deleteSensitiveInformation(user);
        user.updateLoginTime();
        return done(null, user);
    })
        .catch(function (err) {
        return done(err);
    });
}));
