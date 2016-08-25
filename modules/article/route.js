"use strict";
const Express = require('express');
const bodyParser = require('body-parser');
const action = require('./action');
const user_1 = require('../user');
const app_1 = require("../../app");
exports.router = Express.Router();
let jsonParser = bodyParser.json({ limit: '100mb' });
let sequelize = app_1.app.db.sql;
exports.router.get('/', (req, res) => {
    return action.getArticleList()
        .then((articleList) => {
        for (var i in articleList)
            articleList[i].dataValues.link = '/article/show/' + articleList[i].article_id;
        return res.status(200).json(articleList);
    })
        .catch((err) => {
        return res.status(500);
    });
});
exports.router.get('/show/:id', (req, res) => {
    return action.getArticle(req.params['id'])
        .then((article) => {
        if (article == null)
            return res.status(404).json({ message: `Can't find that article.` });
        return res.status(200).render("form-page", { content: article.rendered_HTML,
            title: action.renderTitleHTML(article.title),
            background: article.background_url
        });
    });
});
exports.router.get('/rebuild', (req, res) => {
    return action.rebuildAllArticleHTML()
        .then((articleList) => {
        return res.status(200).json(articleList);
    })
        .catch((err) => {
        return res.status(500);
    });
});
exports.router.get('/:id', (req, res) => {
    return action.getArticle(req.params['id'])
        .then((article) => {
        if (article == null)
            return res.status(404).json({ message: `Can't find that article.` });
        return res.status(200).json(article);
    });
});
exports.router.post('/', user_1.needLogin, jsonParser, (req, res) => {
    return action.addArticle(req.user.user_id, {
        title: req.body.title,
        author: req.body.author,
        content: req.body.content,
        required_permission: req.body.required_permission,
        visable: req.body.visable,
        background_data: req.body.background_data,
        background_filename: req.body.background_filename
    })
        .then((article) => {
        return res.status(200).json(article);
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
exports.router.delete('/', jsonParser, (req, res) => {
    let delete_article_ids = req.body.article_id;
    let promiseList = [];
    return new Promise((resolve, reject) => {
        return sequelize.transaction((t) => {
            for (var i in delete_article_ids)
                promiseList.push(action.deleteArticle(delete_article_ids[i], t));
            return Promise.all(promiseList).then((member) => {
                return resolve(res.status(200).json({ message: "Delete sucessful." }));
            });
        });
    });
});
