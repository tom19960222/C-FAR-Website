/// <reference path="../../../typings/index.d.ts" />

import * as Sequelize from 'sequelize';
import * as crypto from 'crypto';
import * as Promise from 'bluebird';

export interface imageAttributes {
    filename: string;
    original_filename: string;
    path: string;
    image_id?: number;
}

export interface imageInstance extends Sequelize.Instance<imageInstance, imageAttributes> {

  dataValues: imageInstance;

  /* System fields */
  createdAt: Date;
  updatedAt: Date;

  /* Data fields */
  filename: string;
  original_filename: string;
  path: string;
  image_id?: number;
}

export function Image (sequelize: Sequelize.Connection): Sequelize.Model<imageInstance, imageAttributes>{
    let _Image: Sequelize.Model<any, any>;
    if(sequelize) {
        _Image = sequelize.define('image', {
            /* Required fields. */
            filename: {
                type: Sequelize.STRING,
                allowNull: false
            },
            original_filename: {
                type: Sequelize.STRING
            },
            path: {
                type: Sequelize.STRING
            },
            image_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
                unique: true
            }
        });
    }
    return _Image;
}
