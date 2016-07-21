"use strict";
const Sequelize = require('sequelize');
function Message(sequelize) {
    let _Message;
    if (sequelize) {
        _Message = sequelize.define('message', {
            content: {
                type: Sequelize.STRING,
            },
            author: {
                type: Sequelize.STRING
            },
            job_title: {
                type: Sequelize.STRING
            },
            message_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
                unique: true
            }
        });
    }
    return _Message;
}
exports.Message = Message;
