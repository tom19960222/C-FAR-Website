"use strict";
const Sequelize = require('sequelize');
function Member(sequelize) {
    let _Member;
    if (sequelize) {
        _Member = sequelize.define('member', {
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
                type: Sequelize.STRING
            },
            head_pic_url: {
                type: Sequelize.STRING
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
exports.Member = Member;
