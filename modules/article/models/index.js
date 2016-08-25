"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
/// <reference path="../../../typings/index.d.ts" />
const app_1 = require("../../../app");
let sequelize = app_1.app.db.sql;
const article_1 = require('./article');
const user_1 = require('../../user');
let _Article = article_1.Article(sequelize);
exports.articleModel = _Article;
_Article.belongsTo(user_1.userModel, { as: 'creator' });
__export(require('./article'));
