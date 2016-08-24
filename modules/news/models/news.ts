/// <reference path="../../../typings/index.d.ts" />

import * as Sequelize from 'sequelize';
import * as Promise from 'bluebird';
import {userInstance} from '../../user';

export interface linkAttributes {
    link_name: string;
    link_url: string;
}

export interface newsAttributes {
    title: string;
    content?: string;
    link?: linkAttributes[]|string;
    background?: string;
    background_data?: string;
    background_filename?: string;
    news_id?: number;
}

export interface newsInstance extends Sequelize.Instance<newsInstance, newsAttributes>, newsAttributes {

    dataValues: newsInstance;

    setCreator(user: userInstance, options?: Sequelize.BelongsToSetAssociationMixinOptions): Promise<newsInstance>;
    getCreator(options?: Sequelize.BelongsToGetAssociationMixinOptions): Promise<newsInstance>;

    /* System fields */
    createdAt: Date;
    updatedAt: Date;
}

export function News (sequelize: Sequelize.Connection): Sequelize.Model<newsInstance, newsAttributes>{
    let _News: Sequelize.Model<any, any>;
    if(sequelize) {
        _News = sequelize.define('news', {
            /* Required fields. */
            title: {
                type: Sequelize.STRING
            },
            background: {
                type: Sequelize.STRING
            },
            content: {
                type: Sequelize.STRING,
            },
            link: {
                type: Sequelize.TEXT('medium') // JSON String
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
