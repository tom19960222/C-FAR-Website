import * as Express from 'express';
import * as bodyParser from 'body-parser';
import * as action from './action';
import * as Promise from 'bluebird';
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

router.post('/', needLogin, jsonParser, (req, res) => {
    return action.addMember(req.user.user_id, {
        ch_name: req.body.ch_name,
        job_title: req.body.job_title,
        en_name: req.body.en_name,
        introduction: req.body.introduction,
        head_pic_url: req.body.head_pic_url,
        head_pic_data: req.body.head_pic_data,
        head_pic_filename: req.body.head_pic_filename
    })
    .then((member) => {
        return action.getMemberList();
    })
    .then((memberList) => {
        return res.status(200).json(memberList);
    })
})

router.put('/', jsonParser, (req, res) => {
    return action.bulkUpdateMember(req.body)
    .then((member) => {
        return action.getMemberList();
    })
    .then((memberList) => {
        return res.status(200).json(memberList);
    })
    .catch((err: Error) => {
        if(err.message == "Member not found!")
            res.status(404).end();
        else
            res.status(500).end();
    })
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
