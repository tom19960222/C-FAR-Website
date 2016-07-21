/// <reference path="../../typings/index.d.ts" />
import {newsModel, newsInstance, newsAttributes} from './models';
import * as Promise from 'bluebird';
import {EventEmitter} from 'events';
import * as Express from 'express';
import * as Sequelize from 'sequelize';
import {userModel} from '../user';
let sequelize: Sequelize.Sequelize = app.db.sql;

export function addNews(creatorID: number, data: newsAttributes, t?: Sequelize.Transaction): Promise<newsInstance>{
    let news: newsInstance;
    if(t != null){
        data.required_permission = data.required_permission || 0;
        data.visable = data.visable || true;
        return newsModel.create({
            title: data.title,
            summary: data.summary,
            content: data.content,
            required_permission: data.required_permission,
            visable: data.visable
        }, {transaction: t})
        .then((_news) => {
            news = _news;
            return userModel.findById(creatorID);
        })
        .then((user) => {
            return news.setCreator(user, {transaction: t});
        })
        .then(() => {
            return news.save({transaction: t});
        })
    }
    else{
        return sequelize.transaction((t) => {
            data.required_permission = data.required_permission || 0;
            data.visable = data.visable || true;
            return newsModel.create({
                title: data.title,
                summary: data.summary,
                content: data.content,
                required_permission: data.required_permission,
                visable: data.visable
            }, {transaction: t})
            .then((_news) => {
                news = _news;
                return userModel.findById(creatorID);
            })
            .then((user) => {
                return news.setCreator(user, {transaction: t});
            })
            .then(() => {
                return news.save({transaction: t});
            })
        })
    }
}

export function getNewsList(): Promise<newsInstance[]>{
    return newsModel.findAll();
}

export function updateNews(newsID: number, data: newsAttributes, t?: Sequelize.Transaction): Promise<newsInstance>{
    if(t != null) {
        return newsModel.findById(newsID)
        .then((news) => {
            if(news == null) throw new Error("News not found!");
            if(data.title != null) news.title = data.title;
            if(data.summary != null) news.summary = data.summary;
            if(data.content != null)   news.content = data.content;
            if(data.required_permission != null) news.required_permission = data.required_permission;
            if(data.visable != null) news.required_permission = data.required_permission;
            return news.save({transaction: t});
        })
    }
    else {
        return sequelize.transaction((t) => {
            return newsModel.findById(newsID)
            .then((news) => {
                if(news == null) throw new Error("News not found!");
                if(data.title != null) news.title = data.title;
                if(data.summary != null) news.summary = data.summary;
                if(data.content != null)   news.content = data.content;
                if(data.required_permission != null) news.required_permission = data.required_permission;
                if(data.visable != null) news.required_permission = data.required_permission;
                return news.save({transaction: t});
            })
        })
    }

}

export function bulkUpdateNews(newsList: newsAttributes[]): Promise<any>{
    return sequelize.transaction((t) => {
        let promiseList = [];
        newsList.forEach((news) => {
            promiseList.push(updateNews(news.news_id, {
                title: news.title,
                summary: news.summary,
                content: news.content,
                required_permission: news.required_permission,
                visable: news.visable }, t));
        })
        return Promise.all(promiseList);
    })
}

export function deleteNews(newsID: number, t?: Sequelize.Transaction): Promise<void>{
    if(t != null){
        return newsModel.findById(newsID)
        .then((news) => {
            if (news != null)
                return news.destroy({transaction: t});
            else
                throw new Error("News not exist.");
        })
    }
    else {
        return sequelize.transaction((t) => {
            return newsModel.findById(newsID)
            .then((news) => {
                if (news != null)
                    return news.destroy({transaction: t});
                else
                    throw new Error("News not exist.");
            })
        })
    }

}
