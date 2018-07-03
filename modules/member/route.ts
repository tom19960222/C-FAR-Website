import * as Express from 'express';
import * as bodyParser from 'body-parser';
import * as action from './action';
import * as Promise from 'bluebird';
import * as _ from 'lodash';
import {needLogin} from '../user';
import {app} from "../../app";
export let router = Express.Router();
let jsonParser = bodyParser.json({limit: '100mb'});
let sequelize = app.db.sql;

router.get('/', (req, res) => {
    return action.getMemberList()
    .then((memberList) => {
        return res.status(200).json(memberList);
    })
    .catch((err: Error) => {
        return res.status(500);
    })
});

router.post('/', jsonParser, (req, res) => {
    return action.addMember(1, {
        ch_name: req.body.ch_name,
        job_title: req.body.job_title,
        en_name: req.body.en_name,
        introduction: req.body.introduction,
        head_pic_url: req.body.head_pic_url,
        head_pic_data: req.body.head_pic_data,
        head_pic_filename: req.body.head_pic_filename,
        order: req.body.order,
    })
    .then((member) => {
        return action.getMemberList();
    })
    .then((memberList) => {
        return res.status(200).json(memberList);
    })
})

router.put('/', jsonParser, async (req, res) => {
    // 因為前端只肯多加一個 `order` 欄位，所以我們只好自己把全部的 `member` 抓出來，把要修改的那一項先拉掉，
    // 再插到要的位置，再把整個順序更新，最後把除了要更新內容的那一項以外都只更新 `order`
    // 如果以後還想再維護這專案的話，就把這坨屎重構吧
    const updateTarget = _.get(_.compact(_.castArray(req.body)), '[0]');
    updateTarget.member_id = parseInt(updateTarget.member_id);
    updateTarget.order = parseInt(updateTarget.order);
    let allMemberList = await action.getMemberList();
    const existedMemberIndex = _.findIndex(allMemberList, member => member.member_id === updateTarget.member_id);
    _.unset(allMemberList, `[${existedMemberIndex}]`);
    allMemberList = _.compact(allMemberList);
    allMemberList.splice(updateTarget.order - 1, 0, updateTarget);
    let newMemberList = [];
    for(const i in allMemberList){
        allMemberList[i].order = i;
        console.log(allMemberList[i].member_id, updateTarget.member_id);
        if(allMemberList[i].member_id !== updateTarget.member_id)    
            newMemberList.push(_.pick(allMemberList[i], ['member_id', 'order']));
        else {
            updateTarget.order = i;
            newMemberList.push(updateTarget);
        }
            
    }
    await action.bulkUpdateMember(newMemberList);

    try {
        const updatedMemberList = await action.getMemberList();
        return res.status(200).json(updatedMemberList);
    }
    catch(err) {
        if(err.message == "Member not found!")
            res.status(404).end();
        else{
            console.error(err);
            res.status(500).end();
        }
    }
})

router.delete('/', jsonParser, (req, res) => {
    let delete_member_ids = req.body.member_id;

    let promiseList = []

    for (var i in delete_member_ids)
        promiseList.push(action.deleteMember(delete_member_ids[i]));

    // return new Promise((resolve, reject) => {
    //     return sequelize.transaction((t) => {
    //         for (var i in delete_member_ids)
    //             promiseList.push(action.deleteMember(delete_member_ids[i], t));
    //         return Promise.all(promiseList).then((member) => {
    //             return resolve(res.status(200).json({message: "Delete sucessful."}));
    //         })
    //     })
    // })

    return Promise.all(promiseList)
    .then((member) => {
        return res.status(200).json({message: "Delete sucessful."})
    })
})
