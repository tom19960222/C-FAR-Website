/// <reference path="../../../typings/index.d.ts" />

import * as Sequelize from 'sequelize';
import * as crypto from 'crypto';
import * as Promise from 'bluebird';

export interface messageAttributes {
    content: string;
    author: string;
    job_title: string;
    message_id?: number;
}

export interface messageInstance extends Sequelize.Instance<messageInstance, messageAttributes> {

  dataValues: messageInstance;

  /* System fields */
  createdAt: Date;
  updatedAt: Date;

  /* Data fields */
  content: string;
  author: string;
  job_title: string;
  message_id?: number;
}

export function Message (sequelize: Sequelize.Connection): Sequelize.Model<messageInstance, messageAttributes>{
    let _Message: Sequelize.Model<any, any>;
    if(sequelize) {
        _Message = sequelize.define('message', {
            /* Required fields. */
            content: {
                type: Sequelize.TEXT,
            },
            author: {
                type: Sequelize.STRING
            },
            job_title: {
                type: Sequelize.STRING
            },
            message_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
                unique: true
            }
        });
    }
    return _Message;
}
