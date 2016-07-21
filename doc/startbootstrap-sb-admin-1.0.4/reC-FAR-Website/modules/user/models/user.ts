/// <reference path="../../../typings/index.d.ts" />

import * as Sequelize from 'sequelize';
import * as crypto from 'crypto';
import * as Promise from 'bluebird';

/*
    Password is hashed with SHA512.  ( hashed_password = SHA512(plain_password+password_salt) )
    permission:  0: Anonymous 1: normal user 2: admin
*/

export interface userAttributes {
    nickname: string;
    email: string;
    password: string;
    password_salt: string;
    permission: number;
    language: string;
    locked: boolean;
    user_id?: number;

    /* Optional fields. */
    firstname?: string;
    lastname?: string;
    head_image_url?: string;
    core_concept?: string;
    job_title?: string;
    birthday?: Date;
    profession?: string;
    interest?: string;
    gender?: string;
    facebook_id?: string;
    twitter_id?: string;
    skype_id?: string;
    follower_count?: number;
    following_count?: number;

    /* System logging fields. */
    last_access?: Date;
    last_login?: Date;
}

export interface userInstance extends Sequelize.Instance<userAttributes>, userAttributes {

  /* instanceMethods */
  validatePassword(inputPassword: string): boolean;
  updateLoginTime(): Promise<userInstance>;
  setPassword(password: string): Promise<userInstance>;

  dataValues: userInstance;

  /* System fields */
  createdAt: Date;
  updatedAt: Date;
}

export function User (sequelize: Sequelize.Sequelize): Sequelize.Model<userInstance, userAttributes>{
    let _User: Sequelize.Model<any, any>;
    if(sequelize) {
        _User = sequelize.define('user', {

            /* Required fields. */
            nickname: {
                type: Sequelize.STRING,
                allowNull: false
            },
            email: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true
            },
            password: {
                type: Sequelize.STRING,
                allowNull: false
            },
            password_salt: {
                type: Sequelize.STRING,
                allowNull: false
            },
            permission: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            language: {
                type: Sequelize.STRING,
                allowNull: false
            },
            locked: {
                type: Sequelize.BOOLEAN,
                allowNull: false
            },
            user_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
                unique: true
            },

            /* Optional fields. */
            firstname: {
                type: Sequelize.STRING
            },
            lastname: {
                type: Sequelize.STRING
            },
            head_image_url: {
                type: Sequelize.STRING
            },
            core_concept: {
                type: Sequelize.STRING
            },
            job_title: {
                type: Sequelize.STRING
            },
            birthday: {
                type: Sequelize.DATEONLY
            },
            profession: {
                type: Sequelize.STRING
            },
            interest: {
                type: Sequelize.STRING
            },
            gender: {
                type: Sequelize.STRING
            },
            facebook_id: {
                type: Sequelize.STRING
            },
            twitter_id: {
                type: Sequelize.STRING
            },
            skype_id: {
                type: Sequelize.STRING
            },
            follower_count: {
                type: Sequelize.INTEGER
            },
            following_count: {
                type: Sequelize.INTEGER
            },

            /* System logging fields. */
            last_access: {
                type: Sequelize.DATE
            },
            last_login: {
                type: Sequelize.DATE
            },
        },
        {
            instanceMethods: {
                validatePassword: function(inputPassword){
                    let hash = crypto.createHash('sha512');
                    hash.update(inputPassword);
                    hash.update(this.password_salt);
                    return hash.digest('hex') === this.password;
                },
                updateLoginTime: function(){
                    this.last_login = Date.now();
                    return this.save();
                },
                setPassword: function(password: string) {
                    let self = this;
                    return new Promise((resolve, reject) => {
                        return crypto.randomBytes(64, (err, buffer) => {
                            if(err) reject(err);

                            var salt = buffer.toString('hex');
                            var hash = crypto.createHash('sha512');
                            hash.update(password);
                            hash.update(salt);

                            self.password = hash.digest('hex');
                            self.password_salt = salt;

                            return resolve(self.save());
                        });
                    })
                }
            }
        });
    }
    return _User;
}
