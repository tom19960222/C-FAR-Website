"use strict";
const models_1 = require('./models');
const Promise = require('bluebird');
const user_1 = require('../user');
let sequelize = app.db.sql;
function addNews(creatorID, data, t) {
    let news;
    if (t != null) {
        data.required_permission = data.required_permission || 0;
        data.visable = data.visable || true;
        return models_1.newsModel.create({
            title: data.title,
            summary: data.summary,
            content: data.content,
            required_permission: data.required_permission,
            visable: data.visable
        }, { transaction: t })
            .then((_news) => {
            news = _news;
            return user_1.userModel.findById(creatorID);
        })
            .then((user) => {
            return news.setCreator(user, { transaction: t });
        })
            .then(() => {
            return news.save({ transaction: t });
        });
    }
    else {
        return sequelize.transaction((t) => {
            data.required_permission = data.required_permission || 0;
            data.visable = data.visable || true;
            return models_1.newsModel.create({
                title: data.title,
                summary: data.summary,
                content: data.content,
                required_permission: data.required_permission,
                visable: data.visable
            }, { transaction: t })
                .then((_news) => {
                news = _news;
                return user_1.userModel.findById(creatorID);
            })
                .then((user) => {
                return news.setCreator(user, { transaction: t });
            })
                .then(() => {
                return news.save({ transaction: t });
            });
        });
    }
}
exports.addNews = addNews;
function getNewsList() {
    return models_1.newsModel.findAll();
}
exports.getNewsList = getNewsList;
function updateNews(newsID, data, t) {
    if (t != null) {
        return models_1.newsModel.findById(newsID)
            .then((news) => {
            if (news == null)
                throw new Error("News not found!");
            if (data.title != null)
                news.title = data.title;
            if (data.summary != null)
                news.summary = data.summary;
            if (data.content != null)
                news.content = data.content;
            if (data.required_permission != null)
                news.required_permission = data.required_permission;
            if (data.visable != null)
                news.required_permission = data.required_permission;
            return news.save({ transaction: t });
        });
    }
    else {
        return sequelize.transaction((t) => {
            return models_1.newsModel.findById(newsID)
                .then((news) => {
                if (news == null)
                    throw new Error("News not found!");
                if (data.title != null)
                    news.title = data.title;
                if (data.summary != null)
                    news.summary = data.summary;
                if (data.content != null)
                    news.content = data.content;
                if (data.required_permission != null)
                    news.required_permission = data.required_permission;
                if (data.visable != null)
                    news.required_permission = data.required_permission;
                return news.save({ transaction: t });
            });
        });
    }
}
exports.updateNews = updateNews;
function bulkUpdateNews(newsList) {
    return sequelize.transaction((t) => {
        let promiseList = [];
        newsList.forEach((news) => {
            promiseList.push(updateNews(news.news_id, {
                title: news.title,
                summary: news.summary,
                content: news.content,
                required_permission: news.required_permission,
                visable: news.visable }, t));
        });
        return Promise.all(promiseList);
    });
}
exports.bulkUpdateNews = bulkUpdateNews;
function deleteNews(newsID, t) {
    if (t != null) {
        return models_1.newsModel.findById(newsID)
            .then((news) => {
            if (news != null)
                return news.destroy({ transaction: t });
            else
                throw new Error("News not exist.");
        });
    }
    else {
        return sequelize.transaction((t) => {
            return models_1.newsModel.findById(newsID)
                .then((news) => {
                if (news != null)
                    return news.destroy({ transaction: t });
                else
                    throw new Error("News not exist.");
            });
        });
    }
}
exports.deleteNews = deleteNews;
