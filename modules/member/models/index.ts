/// <reference path="../../../typings/index.d.ts" />
import {app} from "../../../app";
let sequelize = app.db.sql;
import {Member} from './member';

let _Member = Member(sequelize);

export {_Member as memberModel};
export * from './member';
