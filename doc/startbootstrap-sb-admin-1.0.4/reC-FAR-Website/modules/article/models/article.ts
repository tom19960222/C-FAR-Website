/// <reference path="../../../typings/index.d.ts" />

import * as Sequelize from 'sequelize';
import * as Promise from 'bluebird';
import {userInstance} from '../../user';

export interface articleAttributes {
    title: string;
    link: string;
    content?: string;
    required_permission: number;
    background_url?: string;
    background_filename? : string;
    background_data?: string;
    visable: boolean;
    article_id?: number;
}

export interface articleInstance extends Sequelize.Instance<articleAttributes>, articleAttributes {

  dataValues: articleInstance;

  /* System fields */
  createdAt: Date;
  updatedAt: Date;

  /* Data fields */
  // title: string;
  // summary?: string;
  // content?: string;
  // required_permission: number;
  // visable: boolean;
  // article_id?: number;
}

export function Article (sequelize: Sequelize.Sequelize): Sequelize.Model<articleInstance, articleAttributes>{
    let _Article: Sequelize.Model<any, any>;
    if(sequelize) {
        _Article = sequelize.define('article', {
            /* Required fields. */
            title: {
                type: Sequelize.STRING
            },
            link: {
                type: Sequelize.STRING
            },
            content: {
                type: Sequelize.STRING
            },
            required_permission: {
                type: Sequelize.INTEGER
            },
            visable: {
                type: Sequelize.BOOLEAN
            },
            background_url: {
                type: Sequelize.STRING
            },
            article_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
                unique: true
            }
        });
    }
    return _Article;
}
