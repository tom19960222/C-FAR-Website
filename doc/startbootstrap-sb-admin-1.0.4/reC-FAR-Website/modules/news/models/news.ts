/// <reference path="../../../typings/index.d.ts" />

import * as Sequelize from 'sequelize';
import * as Promise from 'bluebird';
import {userInstance} from '../../user';

export interface newsAttributes {
    title: string;
    summary?: string;
    content?: string;
    required_permission: number;
    visable: boolean;
    news_id?: number;
}

export interface newsInstance extends Sequelize.Instance<newsAttributes>, Sequelize.BelongsToCreateAssociationMixin<newsAttributes>, newsAttributes {

  dataValues: newsInstance;

  setCreator(user: userInstance, options?: Sequelize.BelongsToSetAssociationMixinOptions): Promise<newsInstance>;
  getCreator(options?: Sequelize.BelongsToGetAssociationMixinOptions): Promise<newsInstance>;

  /* System fields */
  createdAt: Date;
  updatedAt: Date;

  /* Data fields */
  // title: string;
  // summary?: string;
  // content?: string;
  // required_permission: number;
  // visable: boolean;
  // news_id?: number;
}

export function News (sequelize: Sequelize.Sequelize): Sequelize.Model<newsInstance, newsAttributes>{
    let _News: Sequelize.Model<any, any>;
    if(sequelize) {
        _News = sequelize.define('news', {
            /* Required fields. */
            title: {
                type: Sequelize.STRING
            },
            summary: {
                type: Sequelize.STRING
            },
            content: {
                type: Sequelize.STRING,
            },
            required_permission: {
                type: Sequelize.INTEGER
            },
            visable: {
                type: Sequelize.BOOLEAN
            },
            news_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
                unique: true
            }
        });
    }
    return _News;
}
