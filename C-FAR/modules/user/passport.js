var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var action = require('./action');

passport.serializeUser(function(user, done){
    return done(null, user.uid);
});
passport.deserializeUser(function(id, done){
    return action.getUserById(id)
    .then(function(user){
       return done(null, user); 
    })
    .catch(function(err){
        return done(err, {});
    })
})
passport.use('local', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
}, function(email, password, done){
    return action.getUserByEmail(email)
    .then(function(user){
        if(!user) return done(null, false);
        if(!(user.validatePassword(password))) return done(null, false);
        return done(null, user);
    })
    .catch(function(err){
        return done(err);
    })
}));
