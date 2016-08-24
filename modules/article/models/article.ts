/// <reference path="../../../typings/index.d.ts" />

import * as Sequelize from 'sequelize';
import * as Promise from 'bluebird';
import {userInstance} from '../../user';

export interface articleElement {
    type: string;
}

export interface contentElement extends articleElement {
    content: string;
}

export interface imageElement extends articleElement {
    src: string;
    image_data?: string;
    image_filename?: string;
    image_description?: string;
}

export interface articleAttributes {
    title: string;
    author?: string;
    content?: any;
    link?: string;
    required_permission: number;
    background_url?: string;
    background_filename? : string;
    background_data?: string;
    visable: boolean;
    rendered_HTML?: string;
    article_id?: number;
}

export interface articleInstance extends Sequelize.Instance<articleInstance, articleAttributes>, articleAttributes {

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

export function Article (sequelize: Sequelize.Connection): Sequelize.Model<articleInstance, articleAttributes>{
    let _Article: Sequelize.Model<any, any>;
    if(sequelize) {
        _Article = sequelize.define('article', {
            /* Required fields. */
            title: {
                type: Sequelize.STRING
            },
            author: {
                type: Sequelize.STRING
            },
            content: {
                type: Sequelize.TEXT('medium')  // Contains JSON string, really long.
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
            rendered_HTML: {
                type: Sequelize.TEXT
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
