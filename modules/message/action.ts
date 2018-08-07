/// <reference path="../../typings/index.d.ts" />
import {messageModel, messageInstance, messageAttributes} from './models';
import * as Promise from 'bluebird';
import {EventEmitter} from 'events';
import * as Express from 'express';
import * as Sequelize from 'sequelize';
import {app} from "../../app";
let sequelize: Sequelize.Connection = app.db.sql;

export function addMessage(data: messageAttributes, t?: Sequelize.Transaction): Promise<messageInstance>{
    if(t != null){
        return messageModel.create({
            content: data.content,
            author: data.author,
            job_title: data.job_title
        }, {transaction: t});
    }
    else{
        return sequelize.transaction((t) => {
            return messageModel.create({
                content: data.content,
                author: data.author,
                job_title: data.job_title
            }, {transaction: t});
        })
    }
}

export function getMessageList(): Promise<messageInstance[]>{
    return messageModel.findAll();
}

export function updateMessage(messageID: number, data: messageAttributes, t?: Sequelize.Transaction): Promise<messageInstance>{
    if(t != null) {
        return messageModel.findById(messageID)
        .then((message) => {
            if(message == null) throw new Error("Message not found!");
            if(data.content != null)   message.content = data.content;
            if(data.author != null)    message.author = data.author;
            if(data.job_title != null) message.job_title = data.job_title;
            return message.save({transaction: t});
        })
    }
    else {
        return sequelize.transaction((t) => {
            return messageModel.findById(messageID)
            .then((message) => {
                if(message == null) throw new Error("Message not found!");
                if(data.content != null)   message.content = data.content;
                if(data.author != null)    message.author = data.author;
                if(data.job_title != null) message.job_title = data.job_title;
                return message.save({transaction: t});
            })
        })
    }

}

export function bulkUpdateMessage(messageList: messageAttributes[]): Promise<any>{
    return sequelize.transaction((t) => {
        let promiseList = [];
        messageList.forEach((message) => {
            promiseList.push(updateMessage(message.message_id, {
                content: message.content,
                author: message.author,
                job_title: message.job_title }, t));
        })
        return Promise.all(promiseList);
    })
}

export function deleteMessage(messageID: number, t?: Sequelize.Transaction): Promise<void>{
    if(t != null){
        return messageModel.findById(messageID)
        .then((message) => {
            if (message != null)
                return message.destroy({transaction: t});
            else
                throw new Error("Message not exist.");
        })
    }
    else {
        return sequelize.transaction((t) => {
            return messageModel.findById(messageID)
            .then((message) => {
                if (message != null)
                    return message.destroy({transaction: t});
                else
                    throw new Error("Message not exist.");
            })
        })
    }

}
