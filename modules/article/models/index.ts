/// <reference path="../../../typings/index.d.ts" />
import {app} from "../../../app";
let sequelize = app.db.sql;
import {Article} from './article';
import {userModel} from '../../user';

let _Article = Article(sequelize);
_Article.belongsTo(userModel, {as: 'creator'});

export {_Article as articleModel};
export * from './article';
