"use strict";
const Express = require('express');
const bodyParser = require('body-parser');
const action = require('./action');
const user_1 = require('../user');
exports.router = Express.Router();
let jsonParser = bodyParser.json({ limit: '100mb' });
exports.router.get('/', (req, res) => {
    return action.getArticleList()
        .then((articleList) => {
        return res.status(200).json(articleList);
    })
        .catch((err) => {
        return res.status(500);
    });
});
exports.router.post('/', user_1.needLogin, jsonParser, (req, res) => {
    return action.addArticle(req.user.user_id, {
        title: req.body.title,
        link: req.body.link,
        content: req.body.content,
        required_permission: req.body.required_permission,
        visable: req.body.visable,
        background_data: req.body.background_data,
        background_filename: req.body.background_filename
    })
        .then((article) => {
        return action.getArticleList();
    })
        .then((articleList) => {
        return res.status(200).json(articleList);
    });
});
exports.router.put('/', jsonParser, (req, res) => {
    return action.bulkUpdateArticle(req.body)
        .then((article) => {
        return action.getArticleList();
    })
        .then((articleList) => {
        return res.status(200).json(articleList);
    })
        .catch((err) => {
        if (err.message == "Article not found!")
            res.status(404).end();
        else
            res.status(500).end();
    });
});
