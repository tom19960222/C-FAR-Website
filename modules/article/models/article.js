/// <reference path="../../../typings/index.d.ts" />
"use strict";
const Sequelize = require('sequelize');
function Article(sequelize) {
    let _Article;
    if (sequelize) {
        _Article = sequelize.define('article', {
            /* Required fields. */
            title: {
                type: Sequelize.STRING
            },
            author: {
                type: Sequelize.STRING
            },
            content: {
                type: Sequelize.TEXT('medium') // Contains JSON string, really long.
            },
            required_permission: {
                type: Sequelize.INTEGER
            },
            visable: {
                type: Sequelize.BOOLEAN
            },
            background_url: {
                type: Sequelize.STRING
            },
            rendered_HTML: {
                type: Sequelize.TEXT
            },
            article_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
                unique: true
            }
        });
    }
    return _Article;
}
exports.Article = Article;
