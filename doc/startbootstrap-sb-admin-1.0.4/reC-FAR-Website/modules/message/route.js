"use strict";
const Express = require('express');
const bodyParser = require('body-parser');
const action = require('./action');
exports.router = Express.Router();
let jsonParser = bodyParser.json({ limit: '100mb' });
exports.router.get('/', (req, res) => {
    return action.getMessageList()
        .then((messageList) => {
        return res.status(200).json(messageList);
    })
        .catch((err) => {
        return res.status(500);
    });
});
exports.router.post('/', jsonParser, (req, res) => {
    return action.addMessage({
        content: req.body.content,
        author: req.body.author,
        job_title: req.body.job_title })
        .then((message) => {
        return action.getMessageList();
    })
        .then((messageList) => {
        return res.status(200).json(messageList);
    });
});
exports.router.put('/', jsonParser, (req, res) => {
    return action.bulkUpdateMessage(req.body)
        .then((message) => {
        return action.getMessageList();
    })
        .then((messageList) => {
        return res.status(200).json(messageList);
    })
        .catch((err) => {
        if (err.message == "Message not found!")
            res.status(404).end();
        else
            res.status(500).end();
    });
});
