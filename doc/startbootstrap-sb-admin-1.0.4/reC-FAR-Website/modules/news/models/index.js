"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
let sequelize = app.db.sql;
const news_1 = require('./news');
const user_1 = require('../../user');
let _News = news_1.News(sequelize);
exports.newsModel = _News;
_News.belongsTo(user_1.userModel, { as: 'creator' });
__export(require('./news'));
