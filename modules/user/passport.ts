/// <reference path="../../typings/index.d.ts" />

import * as passport from 'passport';
import {Strategy as LocalStrategy} from 'passport-local';
import * as action from './action';
import {userInstance, userAttributes} from './models/user';

// Put all necessary information in session, so we don't have to get them from database every time.
passport.serializeUser((user: userInstance, done) => {
    return action.getUserById(user.user_id)
    .then(function(user){
        return done(null, user);
    });
});

passport.deserializeUser((user, done) => {
    return done(null, user);
});

passport.use('local', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
}, (email, password, done) => {
    return action.getUserByEmail(email, true)
    .then(function(user){
        if(!user) return done(null, false);
        if(!(user.validatePassword(password))) return done(null, false);
        user = action.deleteSensitiveInformation(user); // Don't let frontend know user's password.
        user.updateLoginTime();
        return done(null, user);
    })
    .catch(function(err){
        return done(err);
    })
}));
