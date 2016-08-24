/// <reference path="../../../typings/index.d.ts" />
import {app} from "../../../app";
let sequelize = app.db.sql;
import {Message} from './message';

let _Message = Message(sequelize);

export {_Message as messageModel};
export * from './message';
