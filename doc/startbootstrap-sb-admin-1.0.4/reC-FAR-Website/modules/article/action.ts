/// <reference path="../../typings/index.d.ts" />
import {articleModel, articleInstance, articleAttributes} from './models';
import * as Promise from 'bluebird';
import {EventEmitter} from 'events';
import * as Express from 'express';
import * as Sequelize from 'sequelize';
import {userModel} from '../user';
import {fileAPI} from './';
import {FileAPIResult} from '../file';
let sequelize: Sequelize.Sequelize = app.db.sql;

export function addArticle(creatorID: number, data: articleAttributes, t?: Sequelize.Transaction): Promise<articleInstance>{
    let article: articleInstance;
    if(t != null){
        data.required_permission = data.required_permission || 0;
        data.visable = data.visable || true;
        return articleModel.create({
            title: data.title,
            link: data.link,
            content: data.content,
            required_permission: data.required_permission,
            visable: data.visable
        }, {transaction: t})
        .then((_article) => {
            article = _article;
            return fileAPI.saveFile(data.background_filename, new Buffer(data.background_data, 'base64'))
        })
        .then((dataResult) => {
            article.background_url = dataResult.URI;
            return article.save({transaction: t});
        })
    }
    else{
        return sequelize.transaction((t) => {
            data.required_permission = data.required_permission || 0;
            data.visable = data.visable || true;
            return articleModel.create({
                title: data.title,
                link: data.link,
                content: data.content,
                required_permission: data.required_permission,
                visable: data.visable
            }, {transaction: t})
            .then((_article) => {
                article = _article;
                return fileAPI.saveFile(data.background_filename, new Buffer(data.background_data, 'base64'))
            })
            .then((dataResult) => {
                article.background_url = dataResult.URI;
                return article.save({transaction: t});
            })
        })
    }
}

export function getArticleList(): Promise<articleInstance[]>{
    return articleModel.findAll();
}

export function updateArticle(articleID: number, data: articleAttributes, t?: Sequelize.Transaction): Promise<articleInstance>{
    if(t != null) {
        let article: articleInstance;
        return articleModel.findById(articleID)
        .then((article) => {
            if(article == null) throw new Error("Article not found!");
            if(data.title != null) article.title = data.title;
            if(data.link != null) article.link = data.link;
            if(data.content != null)   article.content = data.content;
            if(data.required_permission != null) article.required_permission = data.required_permission;
            if(data.visable != null) article.required_permission = data.required_permission;
            return article.save({transaction: t});
        })
        .then((_article) => {
            article = _article;
            if(data.background_data != null && data.background_filename != null)
                return fileAPI.saveFile(data.background_filename, new Buffer(data.background_data, 'base64'))
        })
        .then((result) => {
            if(result != null && result.URI != null)
                article.background_url = result.URI;
            return article.save({transaction: t});
        })
    }
    else {
        let article: articleInstance;
        return sequelize.transaction((t) => {
            return articleModel.findById(articleID)
            .then((article) => {
                if(article == null) throw new Error("Article not found!");
                if(data.title != null) article.title = data.title;
                if(data.link != null) article.link = data.link;
                if(data.content != null)   article.content = data.content;
                if(data.required_permission != null) article.required_permission = data.required_permission;
                if(data.visable != null) article.required_permission = data.required_permission;
                return article.save({transaction: t});
            })
            .then((_article) => {
                article = _article;
                if(data.background_data != null && data.background_filename != null)
                    return fileAPI.saveFile(data.background_filename, new Buffer(data.background_data, 'base64'))
            })
            .then((result) => {
                if(result != null && result.URI != null)
                    article.background_url = result.URI;
                return article.save({transaction: t});
            })
        })
    }

}

export function bulkUpdateArticle(articleList: articleAttributes[]): Promise<any>{
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
        })
        return Promise.all(promiseList);
    })
}

export function deleteArticle(articleID: number, t?: Sequelize.Transaction): Promise<void>{
    if(t != null){
        return articleModel.findById(articleID)
        .then((article) => {
            if (article != null)
                return article.destroy({transaction: t});
            else
                throw new Error("Article not exist.");
        })
    }
    else {
        return sequelize.transaction((t) => {
            return articleModel.findById(articleID)
            .then((article) => {
                if (article != null)
                    return article.destroy({transaction: t});
                else
                    throw new Error("Article not exist.");
            })
        })
    }

}
