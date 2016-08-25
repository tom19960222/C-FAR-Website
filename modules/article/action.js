"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
/// <reference path="../../typings/index.d.ts" />
const models_1 = require('./models');
const Promise = require('bluebird');
const _1 = require('./');
const app_1 = require("../../app");
let sequelize = app_1.app.db.sql;
/* Functions from JasonXDDD */
function createContent(data) {
    data = data.replace(/\n/g, "<br />").replace(" ", "&nbsp;");
    return `<div class="row content"><div class="col-12 font-thin">${data}</div></div><!--content-row-->`;
}
function createImage(imageURL, imageDescription) {
    return `<div><img class="XDD-img" src="${imageURL}" width="80%"></div>
            <div style="margin: 0 auto; width: 80%;">${imageDescription}</div>`;
}
function createTitle(data) {
    return `<div class="row title"><div class="col-12 font-thin">${data}</div></div><!--title-row-->`;
}
function createHr() {
    return `<div class="row line"><div class="hr">&nbsp;</div></div>`;
}
function changeBackground(imageURL) {
    return `<script>var bg = document.getElementById('bg');
	bg.style.backgroundImage = url(${imageURL});</script>`;
}
function createComp() {
    return `<div class="XDD-comp"></div>`;
}
function renderTitleHTML(title) {
    return createHr() + createTitle(title) + createComp();
}
exports.renderTitleHTML = renderTitleHTML;
function renderBackgroundHTML(background_url) {
    return changeBackground(background_url);
}
exports.renderBackgroundHTML = renderBackgroundHTML;
function combineContentHTML(content) {
    return __awaiter(this, void 0, Promise, function* () {
        return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
            let fullHTML = '';
            for (let i = 0; i < content.length; i++) {
                if (content[i].type === "content") {
                    fullHTML += createContent(content[i].content);
                    fullHTML += createComp();
                }
                else if (content[i].type === "image" &&
                    ((content[i].image_data !== undefined && content[i].image_filename !== undefined) ||
                        content[i].image_url !== undefined)) {
                    if (content[i].image_description === undefined)
                        content[i].image_description = '';
                    if (content[i].image_url === undefined) {
                        let imageSaveResult = yield _1.fileAPI.saveFile(content[i].image_filename, new Buffer(content[i].image_data, "base64"));
                        fullHTML += createImage(imageSaveResult.URI, content[i].image_description);
                        content[i].image_data = ""; // Clear the content of image, or it will be a huge amount of data.
                        content[i].image_url = imageSaveResult.URI;
                    }
                    else
                        fullHTML += createImage(content[i].image_url, content[i].image_description);
                    fullHTML += createComp();
                }
            }
            return resolve(fullHTML);
        }));
    });
}
exports.combineContentHTML = combineContentHTML;
function rebuildAllArticleHTML() {
    let promiseList = [];
    return models_1.articleModel.findAll()
        .then((articleList) => __awaiter(this, void 0, void 0, function* () {
        for (var i in articleList) {
            // Content is stored in database as JSON string, so it should be parsed first.
            articleList[i].rendered_HTML = yield combineContentHTML(JSON.parse(articleList[i].content));
            promiseList.push(articleList[i].save());
        }
        return Promise.all(promiseList);
    }));
}
exports.rebuildAllArticleHTML = rebuildAllArticleHTML;
function addArticle(creatorID, data, t) {
    let article;
    let fullHTML = "";
    if (t != null) {
        data.required_permission = data.required_permission || 0;
        data.visable = data.visable || true;
        return models_1.articleModel.create({
            title: data.title,
            author: data.author,
            required_permission: data.required_permission,
            visable: data.visable
        }, { transaction: t })
            .then((_article) => __awaiter(this, void 0, void 0, function* () {
            article = _article;
            if (data.background_filename !== undefined && data.background_data !== undefined) {
                let saveFileResult = yield _1.fileAPI.saveFile(data.background_filename, new Buffer(data.background_data, 'base64'));
                article.background_url = saveFileResult.URI;
            }
            article.rendered_HTML = yield combineContentHTML(data.content);
            article.content = JSON.stringify(data.content);
            return article.save({ transaction: t });
        }));
    }
    else {
        return sequelize.transaction((t) => {
            data.required_permission = data.required_permission || 0;
            data.visable = data.visable || true;
            return models_1.articleModel.create({
                title: data.title,
                author: data.author,
                required_permission: data.required_permission,
                visable: data.visable
            }, { transaction: t })
                .then((_article) => __awaiter(this, void 0, void 0, function* () {
                article = _article;
                if (data.background_filename !== undefined && data.background_data !== undefined) {
                    let saveFileResult = yield _1.fileAPI.saveFile(data.background_filename, new Buffer(data.background_data, 'base64'));
                    article.background_url = saveFileResult.URI;
                }
                article.rendered_HTML = yield combineContentHTML(data.content);
                article.content = JSON.stringify(data.content);
                return article.save({ transaction: t });
            }));
        });
    }
}
exports.addArticle = addArticle;
function getArticleList() {
    return models_1.articleModel.findAll({
        attributes: ['title', 'author', 'background_url', 'article_id']
    });
}
exports.getArticleList = getArticleList;
function getArticle(id) {
    return models_1.articleModel.findById(id);
}
exports.getArticle = getArticle;
function updateArticle(articleID, data, t) {
    if (t != null) {
        let article;
        return models_1.articleModel.findById(articleID)
            .then((article) => __awaiter(this, void 0, void 0, function* () {
            if (article == null)
                throw new Error("Article not found!");
            if (data.title != null)
                article.title = data.title;
            if (data.author != null)
                article.author = data.author;
            if (data.required_permission != null)
                article.required_permission = data.required_permission;
            if (data.visable != null)
                article.required_permission = data.required_permission;
            if (data.background_data != null && data.background_filename != null) {
                let result = yield _1.fileAPI.saveFile(data.background_filename, new Buffer(data.background_data, 'base64'));
                article.background_url = result.URI;
            }
            if (data.content != null) {
                article.rendered_HTML = yield combineContentHTML(data.content);
                article.content = JSON.stringify(data.content);
            }
            return article.save({ transaction: t });
        }));
    }
    else {
        let article;
        return sequelize.transaction((t) => {
            return models_1.articleModel.findById(articleID)
                .then((article) => __awaiter(this, void 0, void 0, function* () {
                if (article == null)
                    throw new Error("Article not found!");
                if (data.title != null)
                    article.title = data.title;
                if (data.author != null)
                    article.author = data.author;
                if (data.required_permission != null)
                    article.required_permission = data.required_permission;
                if (data.visable != null)
                    article.required_permission = data.required_permission;
                if (data.background_data != null && data.background_filename != null) {
                    let result = yield _1.fileAPI.saveFile(data.background_filename, new Buffer(data.background_data, 'base64'));
                    article.background_url = result.URI;
                }
                if (data.content != null) {
                    article.rendered_HTML = yield combineContentHTML(data.content);
                    article.content = JSON.stringify(data.content);
                }
                return article.save({ transaction: t });
            }));
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
                author: article.author,
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
