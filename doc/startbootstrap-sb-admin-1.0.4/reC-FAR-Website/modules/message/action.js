"use strict";
const models_1 = require('./models');
const Promise = require('bluebird');
let sequelize = app.db.sql;
function addMessage(data, t) {
    if (t != null) {
        return models_1.messageModel.create({
            content: data.content,
            author: data.author,
            job_title: data.job_title
        }, { transaction: t });
    }
    else {
        return sequelize.transaction((t) => {
            return models_1.messageModel.create({
                content: data.content,
                author: data.author,
                job_title: data.job_title
            }, { transaction: t });
        });
    }
}
exports.addMessage = addMessage;
function getMessageList() {
    return models_1.messageModel.findAll();
}
exports.getMessageList = getMessageList;
function updateMessage(messageID, data, t) {
    if (t != null) {
        return models_1.messageModel.findById(messageID)
            .then((message) => {
            if (message == null)
                throw new Error("Message not found!");
            if (data.content != null)
                message.content = data.content;
            if (data.author != null)
                message.author = data.author;
            if (data.job_title != null)
                message.job_title = data.job_title;
            return message.save({ transaction: t });
        });
    }
    else {
        return sequelize.transaction((t) => {
            return models_1.messageModel.findById(messageID)
                .then((message) => {
                if (message == null)
                    throw new Error("Message not found!");
                if (data.content != null)
                    message.content = data.content;
                if (data.author != null)
                    message.author = data.author;
                if (data.job_title != null)
                    message.job_title = data.job_title;
                return message.save({ transaction: t });
            });
        });
    }
}
exports.updateMessage = updateMessage;
function bulkUpdateMessage(messageList) {
    return sequelize.transaction((t) => {
        let promiseList = [];
        messageList.forEach((message) => {
            promiseList.push(updateMessage(message.message_id, {
                content: message.content,
                author: message.author,
                job_title: message.job_title }, t));
        });
        return Promise.all(promiseList);
    });
}
exports.bulkUpdateMessage = bulkUpdateMessage;
function deleteMessage(messageID, t) {
    if (t != null) {
        return models_1.messageModel.findById(messageID)
            .then((message) => {
            if (message != null)
                return message.destroy({ transaction: t });
            else
                throw new Error("Message not exist.");
        });
    }
    else {
        return sequelize.transaction((t) => {
            return models_1.messageModel.findById(messageID)
                .then((message) => {
                if (message != null)
                    return message.destroy({ transaction: t });
                else
                    throw new Error("Message not exist.");
            });
        });
    }
}
exports.deleteMessage = deleteMessage;
