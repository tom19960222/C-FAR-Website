/// <reference path="../../../typings/index.d.ts" />
declare var app: Express.Application;
let sequelize = app.db.sql;
import {News} from './news';
import {userModel} from '../../user';

let _News = News(sequelize);
_News.belongsTo(userModel, {as: 'creator'});

export {_News as newsModel};
export * from './news';
