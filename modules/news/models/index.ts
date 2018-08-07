/// <reference path="../../../typings/index.d.ts" />
import {app} from "../../../app";
let sequelize = app.db.sql;
import {News} from './news';
import {userModel} from '../../user';

let _News = News(sequelize);
_News.belongsTo(userModel, {as: 'creator'});

export {_News as newsModel};
export * from './news';
