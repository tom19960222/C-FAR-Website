"use strict";
const Sequelize = require('sequelize');
function Article(sequelize) {
    let _Article;
    if (sequelize) {
        _Article = sequelize.define('article', {
            title: {
                type: Sequelize.STRING
            },
            link: {
                type: Sequelize.STRING
            },
            content: {
                type: Sequelize.STRING
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
