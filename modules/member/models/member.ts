/// <reference path="../../../typings/index.d.ts" />

import * as Sequelize from 'sequelize';
import * as Promise from 'bluebird';
import {userInstance} from '../../user';

export interface memberAttributes {
    ch_name: string;
    job_title: string;
    en_name: string;
    introduction: string;
    order: number;
    head_pic_url?: string;
    head_pic_filename? : string;
    head_pic_data?: string;
    member_id?: number;
}

export interface memberInstance extends Sequelize.Instance<memberInstance, memberAttributes>, Sequelize.BelongsToCreateAssociationMixin<memberAttributes, memberInstance>, memberAttributes {

  dataValues: memberInstance;

  /* System fields */
  createdAt: Date;
  updatedAt: Date;

  /* Data fields */
  // title: string;
  // summary?: string;
  // content?: string;
  // required_permission: number;
  // visable: boolean;
  // member_id?: number;
}

export function Member (sequelize: Sequelize.Connection): Sequelize.Model<memberInstance, memberAttributes>{
    let _Member: Sequelize.Model<any, any>;
    if(sequelize) {
        _Member = sequelize.define('member', {
            /* Required fields. */
            ch_name: {
                type: Sequelize.STRING
            },
            job_title: {
                type: Sequelize.STRING
            },
            en_name: {
                type: Sequelize.STRING,
            },
            introduction: {
                type: Sequelize.TEXT
            },
            head_pic_url: {
                type: Sequelize.STRING
            },
            order: {
                type: Sequelize.INTEGER,
            },
            member_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
                unique: true
            }
        });
    }
    return _Member;
}
