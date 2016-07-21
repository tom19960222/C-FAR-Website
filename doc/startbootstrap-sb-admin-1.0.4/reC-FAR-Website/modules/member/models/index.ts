/// <reference path="../../../typings/index.d.ts" />
declare var app: Express.Application;
let sequelize = app.db.sql;
import {Member} from './member';

let _Member = Member(sequelize);

export {_Member as memberModel};
export * from './member';
