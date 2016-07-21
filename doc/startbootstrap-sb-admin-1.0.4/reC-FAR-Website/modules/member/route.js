"use strict";
const Express = require('express');
const bodyParser = require('body-parser');
const action = require('./action');
const user_1 = require('../user');
exports.router = Express.Router();
let jsonParser = bodyParser.json({ limit: '100mb' });
exports.router.get('/', (req, res) => {
    return action.getMemberList()
        .then((memberList) => {
        return res.status(200).json(memberList);
    })
        .catch((err) => {
        return res.status(500);
    });
});
exports.router.post('/', user_1.needLogin, jsonParser, (req, res) => {
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
    });
});
exports.router.put('/', jsonParser, (req, res) => {
    return action.bulkUpdateMember(req.body)
        .then((member) => {
        return action.getMemberList();
    })
        .then((memberList) => {
        return res.status(200).json(memberList);
    })
        .catch((err) => {
        if (err.message == "Member not found!")
            res.status(404).end();
        else
            res.status(500).end();
    });
});
exports.router.delete('/:id', (req, res) => {
    let delete_member_id = -1;
    try {
        delete_member_id = parseInt(req.params['id']);
    }
    catch (err) { }
    if (delete_member_id == -1)
        return res.status(400).json({ message: "Please provide correct member ID!" });
    else
        return action.deleteMember(delete_member_id)
            .then((member) => {
            return res.status(200).json({ message: "Delete sucessful." });
        });
});
