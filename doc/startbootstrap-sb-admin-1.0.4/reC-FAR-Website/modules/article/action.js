"use strict";
const models_1 = require('./models');
const Promise = require('bluebird');
const _1 = require('./');
let sequelize = app.db.sql;
function addArticle(creatorID, data, t) {
    let article;
    if (t != null) {
        data.required_permission = data.required_permission || 0;
        data.visable = data.visable || true;
        return models_1.articleModel.create({
            title: data.title,
            link: data.link,
            content: data.content,
            required_permission: data.required_permission,
            visable: data.visable
        }, { transaction: t })
            .then((_article) => {
            article = _article;
            return _1.fileAPI.saveFile(data.background_filename, new Buffer(data.background_data, 'base64'));
        })
            .then((dataResult) => {
            article.background_url = dataResult.URI;
            return article.save({ transaction: t });
        });
    }
    else {
        return sequelize.transaction((t) => {
            data.required_permission = data.required_permission || 0;
            data.visable = data.visable || true;
            return models_1.articleModel.create({
                title: data.title,
                link: data.link,
                content: data.content,
                required_permission: data.required_permission,
                visable: data.visable
            }, { transaction: t })
                .then((_article) => {
                article = _article;
                return _1.fileAPI.saveFile(data.background_filename, new Buffer(data.background_data, 'base64'));
            })
                .then((dataResult) => {
                article.background_url = dataResult.URI;
                return article.save({ transaction: t });
            });
        });
    }
}
exports.addArticle = addArticle;
function getArticleList() {
    return models_1.articleModel.findAll();
}
exports.getArticleList = getArticleList;
function updateArticle(articleID, data, t) {
    if (t != null) {
        let article;
        return models_1.articleModel.findById(articleID)
            .then((article) => {
            if (article == null)
                throw new Error("Article not found!");
            if (data.title != null)
                article.title = data.title;
            if (data.link != null)
                article.link = data.link;
            if (data.content != null)
                article.content = data.content;
            if (data.required_permission != null)
                article.required_permission = data.required_permission;
            if (data.visable != null)
                article.required_permission = data.required_permission;
            return article.save({ transaction: t });
        })
            .then((_article) => {
            article = _article;
            if (data.background_data != null && data.background_filename != null)
                return _1.fileAPI.saveFile(data.background_filename, new Buffer(data.background_data, 'base64'));
        })
            .then((result) => {
            if (result != null && result.URI != null)
                article.background_url = result.URI;
            return article.save({ transaction: t });
        });
    }
    else {
        let article;
        return sequelize.transaction((t) => {
            return models_1.articleModel.findById(articleID)
                .then((article) => {
                if (article == null)
                    throw new Error("Article not found!");
                if (data.title != null)
                    article.title = data.title;
                if (data.link != null)
                    article.link = data.link;
                if (data.content != null)
                    article.content = data.content;
                if (data.required_permission != null)
                    article.required_permission = data.required_permission;
                if (data.visable != null)
                    article.required_permission = data.required_permission;
                return article.save({ transaction: t });
            })
                .then((_article) => {
                article = _article;
                if (data.background_data != null && data.background_filename != null)
                    return _1.fileAPI.saveFile(data.background_filename, new Buffer(data.background_data, 'base64'));
            })
                .then((result) => {
                if (result != null && result.URI != null)
                    article.background_url = result.URI;
                return article.save({ transaction: t });
            });
        });
    }
}
exports.updateArticle = updateArticle;
function bulkUpdateArticle(articleList) {
    return sequelize.transaction((t) => {
        let promiseList = [];
        articleList.forEach((article) => {
            promiseList.push(updateArticle(article.article_id, {
                title: article.title,
                link: article.link,
                content: article.content,
                required_permission: article.required_permission,
                visable: article.visable,
                background_data: article.background_data,
                background_filename: article.background_filename }, t));
        });
        return Promise.all(promiseList);
    });
}
exports.bulkUpdateArticle = bulkUpdateArticle;
function deleteArticle(articleID, t) {
    if (t != null) {
        return models_1.articleModel.findById(articleID)
            .then((article) => {
            if (article != null)
                return article.destroy({ transaction: t });
            else
                throw new Error("Article not exist.");
        });
    }
    else {
        return sequelize.transaction((t) => {
            return models_1.articleModel.findById(articleID)
                .then((article) => {
                if (article != null)
                    return article.destroy({ transaction: t });
                else
                    throw new Error("Article not exist.");
            });
        });
    }
}
exports.deleteArticle = deleteArticle;
