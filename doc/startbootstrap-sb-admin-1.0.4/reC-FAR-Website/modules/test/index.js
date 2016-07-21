"use strict";
const Express = require('express');
const bodyParser = require('body-parser');
const fileAPI = require('../file');
let file = fileAPI.action.register('/test', 'test');
exports.router = Express.Router();
exports.router.get('/test', (req, res) => {
    console.log('Imcoming YEE!');
    res.status(200).send("Let's YEE!").end();
});
exports.router.post('/file', bodyParser.json({ limit: '50mb' }), (req, res) => {
    return file.saveFile(req.body.filename, new Buffer(req.body.image, 'base64'))
        .then((result) => {
        return res.status(200).json({ URI: result.URI });
    });
});
exports.init = function () {
};
