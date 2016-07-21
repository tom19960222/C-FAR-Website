import * as Express from 'express';
import * as bodyParser from 'body-parser';
import * as action from './action';
import {needLogin} from '../user';
export let router = Express.Router();
let jsonParser = bodyParser.json({limit: '100mb'});

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

router.delete('/:id', (req, res) => {
    let delete_member_id = -1;
    try {delete_member_id = parseInt(req.params['id']);}
    catch(err){}

    if (delete_member_id == -1)
        return res.status(400).json({message: "Please provide correct member ID!"})
    else
        return action.deleteMember(delete_member_id)
        .then((member) => {
            return res.status(200).json({message: "Delete sucessful."})
        })
})
