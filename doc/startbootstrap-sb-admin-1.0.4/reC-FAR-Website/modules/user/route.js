"use strict";
const Express = require('express');
const action = require('./action');
const bodyParser = require('body-parser');
const passport = require('passport');
let jsonParser = bodyParser.json();
function needLogin(req, res, next) {
    if (req.isAuthenticated())
        return next();
    else
        return res.status(401).end();
}
exports.needLogin = needLogin;
exports.router = Express.Router();
exports.router.use('/assets', Express.static(__dirname + '/public/assets'));
exports.router.post('/add', jsonParser, function (req, res, next) {
    let body = req.body;
    return action.addUser(body.nickname, body.email, body.password, body.permission, body.language, {
        firstname: body.firstname,
        lastname: body.lastname,
        head_image_url: body.head_image_url,
        core_concept: body.core_concept,
        job_title: body.job_title,
        birthday: body.birthday,
        profession: body.profession,
        interest: body.interest,
        gender: body.gender,
        facebook_id: body.facebook_id,
        twitter_id: body.twitter_id,
        skype_id: body.skype_id
    })
        .then(function (user) {
        res.status(201).json({ message: 'User added.' });
    })
        .error(function (err) {
        res.status(500).json({ message: 'User add failed - ' + err });
    });
});
exports.router.get('/detail', function (req, res, next) {
    res.status(501).send("<h1>Not implemented</h1>");
});
exports.router.post('/edit', function (req, res, next) {
    res.status(501).send("<h1>Not implemented</h1>");
});
exports.router.post('/delete', function (req, res, next) {
    res.status(501).send("<h1>Not implemented</h1>");
});
exports.router.post('/login', jsonParser, passport.authenticate('local'), function (req, res, next) {
    res.status(200).json(req.user);
});
exports.router.get('/logout', function (req, res, next) {
    req.logout();
    res.status(200).json({ message: 'Logout successed.' });
});
