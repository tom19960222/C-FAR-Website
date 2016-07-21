"use strict";
const models_1 = require('./models');
const Promise = require('bluebird');
const _1 = require('./');
let sequelize = app.db.sql;
function addMember(creatorID, data, t) {
    let member;
    if (t != null) {
        return models_1.memberModel.create({
            ch_name: data.ch_name,
            job_title: data.job_title,
            en_name: data.en_name,
            introduction: data.introduction,
        }, { transaction: t })
            .then((_member) => {
            member = _member;
            return _1.fileAPI.saveFile(data.head_pic_filename, new Buffer(data.head_pic_data, 'base64'));
        })
            .then((dataResult) => {
            member.head_pic_url = dataResult.URI;
            return member.save({ transaction: t });
        });
    }
    else {
        return sequelize.transaction((t) => {
            return models_1.memberModel.create({
                ch_name: data.ch_name,
                job_title: data.job_title,
                en_name: data.en_name,
                introduction: data.introduction,
            }, { transaction: t })
                .then((_member) => {
                member = _member;
                return _1.fileAPI.saveFile(data.head_pic_filename, new Buffer(data.head_pic_data, 'base64'));
            })
                .then((dataResult) => {
                member.head_pic_url = dataResult.URI;
                return member.save({ transaction: t });
            });
        });
    }
}
exports.addMember = addMember;
function getMemberList() {
    return models_1.memberModel.findAll();
}
exports.getMemberList = getMemberList;
function updateMember(memberID, data, t) {
    let _member;
    if (t != null) {
        return models_1.memberModel.findById(memberID)
            .then((member) => {
            if (member == null)
                throw new Error("Member not found!");
            _member = member;
            if (data.ch_name != null)
                member.ch_name = data.ch_name;
            if (data.job_title != null)
                member.job_title = data.job_title;
            if (data.en_name != null)
                member.en_name = data.en_name;
            if (data.introduction != null)
                member.introduction = data.introduction;
            if (data.head_pic_url != null)
                member.head_pic_url = data.head_pic_url;
            return member.save({ transaction: t });
        })
            .then(() => {
            if (data.head_pic_data != null && data.head_pic_filename != null)
                return _1.fileAPI.saveFile(data.head_pic_filename, new Buffer(data.head_pic_data, 'base64'));
        })
            .then((result) => {
            if (result != null && result.URI != null)
                _member.head_pic_url = result.URI;
            return _member.save({ transaction: t });
        });
    }
    else {
        return models_1.memberModel.findById(memberID)
            .then((member) => {
            if (member == null)
                throw new Error("Member not found!");
            _member = member;
            if (data.ch_name != null)
                member.ch_name = data.ch_name;
            if (data.job_title != null)
                member.job_title = data.job_title;
            if (data.en_name != null)
                member.en_name = data.en_name;
            if (data.introduction != null)
                member.introduction = data.introduction;
            if (data.head_pic_url != null)
                member.head_pic_url = data.head_pic_url;
            return member.save({ transaction: t });
        })
            .then(() => {
            if (data.head_pic_data != null && data.head_pic_filename != null)
                return _1.fileAPI.saveFile(data.head_pic_filename, new Buffer(data.head_pic_data, 'base64'));
        })
            .then((result) => {
            if (result != null && result.URI != null)
                _member.head_pic_url = result.URI;
            return _member.save({ transaction: t });
        });
    }
}
exports.updateMember = updateMember;
function bulkUpdateMember(memberList) {
    return sequelize.transaction((t) => {
        let promiseList = [];
        memberList.forEach((member) => {
            promiseList.push(updateMember(member.member_id, {
                ch_name: member.ch_name,
                job_title: member.job_title,
                en_name: member.en_name,
                introduction: member.introduction,
                head_pic_url: member.head_pic_url,
                head_pic_data: member.head_pic_data,
                head_pic_filename: member.head_pic_filename
            }, t));
        });
        return Promise.all(promiseList);
    });
}
exports.bulkUpdateMember = bulkUpdateMember;
function deleteMember(memberID, t) {
    if (t != null) {
        return models_1.memberModel.findById(memberID)
            .then((member) => {
            if (member != null)
                return member.destroy({ transaction: t });
            else
                throw new Error("Member not exist.");
        });
    }
    else {
        return sequelize.transaction((t) => {
            return models_1.memberModel.findById(memberID)
                .then((member) => {
                if (member != null)
                    return member.destroy({ transaction: t });
                else
                    throw new Error("Member not exist.");
            });
        });
    }
}
exports.deleteMember = deleteMember;
