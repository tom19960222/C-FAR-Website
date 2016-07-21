"use strict";
const Express = require('express');
const bodyParser = require('body-parser');
const action = require('./action');
const user_1 = require('../user');
exports.router = Express.Router();
let jsonParser = bodyParser.json({ limit: '100mb' });
exports.router.get('/', (req, res) => {
    return action.getNewsList()
        .then((newsList) => {
        return res.status(200).json(newsList);
    })
        .catch((err) => {
        return res.status(500);
    });
});
exports.router.post('/', user_1.needLogin, jsonParser, (req, res) => {
    return action.addNews(req.user.user_id, {
        title: req.body.title,
        summary: req.body.summary,
        content: req.body.content,
        required_permission: req.body.required_permission,
        visable: req.body.visable
    })
        .then((news) => {
        return action.getNewsList();
    })
        .then((newsList) => {
        return res.status(200).json(newsList);
    });
});
exports.router.put('/', jsonParser, (req, res) => {
    return action.bulkUpdateNews(req.body)
        .then((news) => {
        return action.getNewsList();
    })
        .then((newsList) => {
        return res.status(200).json(newsList);
    })
        .catch((err) => {
        if (err.message == "News not found!")
            res.status(404).end();
        else
            res.status(500).end();
    });
});
