/// <reference path="../../typings/index.d.ts" />
import {newsModel, newsInstance, newsAttributes} from './models';
import * as BluebirdPromise from 'bluebird';
import * as Sequelize from 'sequelize';
import {fileAPI} from './';
import {app} from "../../app";
let sequelize: Sequelize.Connection = app.db.sql;

export function addNews(creatorID: number, data: newsAttributes, t?: Sequelize.Transaction): BluebirdPromise<newsInstance>{
    if(t != null){
        return newsModel.create({
            title: data.title,
            content: data.content,
            link: JSON.stringify(data.link)
        }, {transaction: t})
        .then(async(news) => {
            if (data.background_data !== undefined && data.background_filename !== undefined){
                let saveResult = await fileAPI.saveFile(data.background_filename, new Buffer(data.background_data, 'base64'));
                news.background = saveResult.URI;
            }
            return news.save({transaction: t});
        })
        .catch((err: Error) => {
            console.error(err);
            throw err;
        })
    }
    else{
        return sequelize.transaction((t) => {
            return newsModel.create({
                title: data.title,
                content: data.content,
                link: JSON.stringify(data.link)
            }, {transaction: t})
            .then(async(news) => {
                if (data.background_data !== undefined && data.background_filename !== undefined){
                    let saveResult = await fileAPI.saveFile(data.background_filename, new Buffer(data.background_data, 'base64'));
                    news.background = saveResult.URI;
                }
                return news.save({transaction: t});
            })
            .catch((err: Error) => {
                console.error(err);
                throw err;
            })
        })
    }
}

export function getNewsList(): BluebirdPromise<newsInstance[]>{
    return newsModel.findAll();
}

export function updateNews(newsID: number, data: newsAttributes, t?: Sequelize.Transaction): BluebirdPromise<newsInstance>{
    if(t != null) {
        return newsModel.findById(newsID)
        .then(async(news) => {
            if(news == null) throw new Error("News not found!");
            if(data.title != null) news.title = data.title;
            if(data.content != null)   news.content = data.content;
            if(data.link != null) news.link = JSON.stringify(data.link);
            if(data.background_data != null && data.background_filename != null){
                let saveResult = await fileAPI.saveFile(data.background_filename, new Buffer(data.background_data, 'base64'));
                news.background = saveResult.URI;
            }
            return news.save({transaction: t});
        })
        .catch((err: Error) => {
            throw err;
        })
    }
    else {
        return sequelize.transaction((t) => {
            return newsModel.findById(newsID)
            .then(async(news) => {
                if(news == null) throw new Error("News not found!");
                if(data.title != null) news.title = data.title;
                if(data.content != null)   news.content = data.content;
                if(data.link != null) news.link = JSON.stringify(data.link);
                if(data.background_data != null && data.background_filename != null){
                    let saveResult = await fileAPI.saveFile(data.background_filename, new Buffer(data.background_data, 'base64'));
                    news.background = saveResult.URI;
                }
                return news.save({transaction: t});
            })
            .catch((err: Error) => {
                throw err;
            })
        })
    }

}

export function bulkUpdateNews(newsList: newsAttributes[]): BluebirdPromise<any>{
    return sequelize.transaction((t) => {
        let promiseList = [];
        newsList.forEach((news) => {
            promiseList.push(updateNews(news.news_id, {
                title: news.title,
                background_data: news.background_data,
                background_filename: news.background_filename,
                content: news.content,
                link: news.link }, t));
        });
        return BluebirdPromise.all(promiseList);
    })
}

export function deleteNews(newsID: number, t?: Sequelize.Transaction): BluebirdPromise<void>{
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
