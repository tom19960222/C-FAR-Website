"use strict";
const Sequelize = require('sequelize');
const crypto = require('crypto');
const Promise = require('bluebird');
function User(sequelize) {
    let _User;
    if (sequelize) {
        _User = sequelize.define('user', {
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
            last_access: {
                type: Sequelize.DATE
            },
            last_login: {
                type: Sequelize.DATE
            },
        }, {
            instanceMethods: {
                validatePassword: function (inputPassword) {
                    let hash = crypto.createHash('sha512');
                    hash.update(inputPassword);
                    hash.update(this.password_salt);
                    return hash.digest('hex') === this.password;
                },
                updateLoginTime: function () {
                    this.last_login = Date.now();
                    return this.save();
                },
                setPassword: function (password) {
                    let self = this;
                    return new Promise((resolve, reject) => {
                        return crypto.randomBytes(64, (err, buffer) => {
                            if (err)
                                reject(err);
                            var salt = buffer.toString('hex');
                            var hash = crypto.createHash('sha512');
                            hash.update(password);
                            hash.update(salt);
                            self.password = hash.digest('hex');
                            self.password_salt = salt;
                            return resolve(self.save());
                        });
                    });
                }
            }
        });
    }
    return _User;
}
exports.User = User;
