/// <reference path="../../typings/index.d.ts" />
import {memberModel, memberInstance, memberAttributes} from './models';
import * as Promise from 'bluebird';
import {EventEmitter} from 'events';
import * as Express from 'express';
import * as Sequelize from 'sequelize';
import {fileAPI} from './';
import {FileAPIResult} from '../file';
import {app} from "../../app";

let sequelize: Sequelize.Connection = app.db.sql;

export function addMember(creatorID: number, data: memberAttributes, t?: Sequelize.Transaction): Promise<memberInstance>{
    let member: memberInstance;
    if(t != null){
        return getMemberList()
        .then(existedMemberList => {
            const lastMember = existedMemberList.length > 0 ? existedMemberList[existedMemberList.length - 1] : null;
            return memberModel.create({
                ch_name: data.ch_name,
                job_title: data.job_title,
                en_name: data.en_name,
                introduction: data.introduction,
                order: lastMember ? lastMember.order : data.order || 0,
            }, {transaction: t})
        })
        .then((_member) => {
            member = _member;
            return fileAPI.saveFile(data.head_pic_filename, new Buffer(data.head_pic_data, 'base64'))
        })
        .then((dataResult) => {
            member.head_pic_url = dataResult.URI;
            return member.save({transaction: t});
        })
    }
    else{
        return sequelize.transaction((t) => {
            return getMemberList()
            .then(existedMemberList => {
                const lastMember = existedMemberList.length > 0 ? existedMemberList[existedMemberList.length - 1] : null;
                return memberModel.create({
                    ch_name: data.ch_name,
                    job_title: data.job_title,
                    en_name: data.en_name,
                    introduction: data.introduction,
                    order: lastMember ? lastMember.order : data.order || 0,
                }, {transaction: t})
            })
            .then((_member) => {
                member = _member;
                return fileAPI.saveFile(data.head_pic_filename, new Buffer(data.head_pic_data, 'base64'))
            })
            .then((dataResult) => {
                member.head_pic_url = dataResult.URI;
                return member.save({transaction: t});
            })
        })
    }
}

export function getMemberList(): Promise<memberInstance[]>{
    return memberModel.findAll()
    .then(memberList => {
        return Promise.resolve(memberList.sort((member1, member2) => (member1.order - member2.order)));
    })
}

export function updateMember(memberID: number, data: memberAttributes, t?: Sequelize.Transaction): Promise<memberInstance>{
    let _member: memberInstance;
    if(t != null) {
        return memberModel.findById(memberID)
        .then((member) => {
            if(member == null) throw new Error("Member not found!");
            _member = member;
            if(data.ch_name != null) member.ch_name = data.ch_name;
            if(data.job_title != null) member.job_title = data.job_title;
            if(data.en_name != null)   member.en_name = data.en_name;
            if(data.introduction != null) member.introduction = data.introduction;
            if(data.head_pic_url != null) member.head_pic_url = data.head_pic_url;
            if(data.order != null) member.order = data.order;
            return member.save({transaction: t});
        })
        .then(() => {
            if(data.head_pic_data != null && data.head_pic_filename != null)
                return fileAPI.saveFile(data.head_pic_filename, new Buffer(data.head_pic_data, 'base64'))
        })
        .then((result) => {
            if(result != null && result.URI != null)
                _member.head_pic_url = result.URI;
            return _member.save({transaction: t});
        })
    }
    else {
        return memberModel.findById(memberID)
        .then((member) => {
            if(member == null) throw new Error("Member not found!");
            _member = member;
            if(data.ch_name != null) member.ch_name = data.ch_name;
            if(data.job_title != null) member.job_title = data.job_title;
            if(data.en_name != null)   member.en_name = data.en_name;
            if(data.introduction != null) member.introduction = data.introduction;
            if(data.head_pic_url != null) member.head_pic_url = data.head_pic_url;
            if(data.order != null) member.order = data.order;
            return member.save({transaction: t});
        })
        .then(() => {
            if(data.head_pic_data != null && data.head_pic_filename != null)
                return fileAPI.saveFile(data.head_pic_filename, new Buffer(data.head_pic_data, 'base64'))
        })
        .then((result) => {
            if(result != null && result.URI != null)
                _member.head_pic_url = result.URI;
            return _member.save({transaction: t});
        })
    }
}

export function bulkUpdateMember(memberList: memberAttributes[]): Promise<any>{
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
                head_pic_filename: member.head_pic_filename,
                order: member.order,
            }, t));
        });
        return Promise.all(promiseList);
    })
}

export function deleteMember(memberID: number, t?: Sequelize.Transaction): Promise<void>{
    if(t != null){
        return memberModel.findById(memberID)
        .then((member) => {
            if (member != null)
                return member.destroy({transaction: t});
            else
                throw new Error("Member not exist.");
        })
    }
    else {
        return sequelize.transaction((t) => {
            return memberModel.findById(memberID)
            .then((member) => {
                if (member != null)
                    return member.destroy({transaction: t});
                else
                    throw new Error("Member not exist.");
            })
        })
    }
}
