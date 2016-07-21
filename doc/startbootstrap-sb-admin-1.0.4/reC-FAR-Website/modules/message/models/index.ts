/// <reference path="../../../typings/index.d.ts" />
declare var app: Express.Application;
let sequelize = app.db.sql;
import {Message} from './message';

let _Message = Message(sequelize);

export {_Message as messageModel};
export * from './message';
