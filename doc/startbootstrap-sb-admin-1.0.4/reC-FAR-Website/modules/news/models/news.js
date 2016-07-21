"use strict";
const Sequelize = require('sequelize');
function News(sequelize) {
    let _News;
    if (sequelize) {
        _News = sequelize.define('news', {
            title: {
                type: Sequelize.STRING
            },
            summary: {
                type: Sequelize.STRING
            },
            content: {
                type: Sequelize.STRING,
            },
            required_permission: {
                type: Sequelize.INTEGER
            },
            visable: {
                type: Sequelize.BOOLEAN
            },
            news_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
                unique: true
            }
        });
    }
    return _News;
}
exports.News = News;
