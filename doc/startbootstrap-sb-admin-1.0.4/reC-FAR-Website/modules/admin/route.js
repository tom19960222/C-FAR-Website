"use strict";
const Express = require('express');
const action_1 = require('./action');
exports.router = Express.Router();
exports.router.get('/action/restart', function (req, res, next) {
    var ok = true;
    if (req.isUnauthenticated()) {
        res.status(403).json({ message: 'You have no permission to do it.' }).end();
        ok = false;
    }
    if (ok)
        next();
}, function (req, res) {
    res.status(200).json({ message: 'Starting to restart system, please wait a minute...' });
    action_1.restartWebsite();
});
