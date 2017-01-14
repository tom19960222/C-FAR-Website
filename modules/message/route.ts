import * as Express from 'express';
import * as bodyParser from 'body-parser';
import * as action from './action';
import {app} from "../../app";
export let router = Express.Router();
let jsonParser = bodyParser.json({limit: '100mb'});
let sequelize = app.db.sql;

router.get('/', (req, res) => {
    return action.getMessageList()
    .then((messageList) => {
        return res.status(200).json(messageList);
    })
    .catch((err: Error) => {
        return res.status(500);
    })
});

router.post('/', jsonParser, (req, res) => {
    return action.addMessage({
        content: req.body.content,
        author: req.body.author,
        job_title: req.body.job_title})
    .then((message) => {
        return action.getMessageList();
    })
    .then((messageList) => {
        return res.status(200).json(messageList);
    })
})

router.put('/', jsonParser, (req, res) => {
    return action.bulkUpdateMessage(req.body)
    .then((message) => {
        return action.getMessageList();
    })
    .then((messageList) => {
        return res.status(200).json(messageList);
    })
    .catch((err: Error) => {
        if(err.message == "Message not found!")
            res.status(404).end();
        else
            res.status(500).end();
    })
});

router.delete("/", jsonParser, (req, res) => {
    let delete_message_ids = req.body.message_id;

    let promiseList = [];

    return new Promise((resolve, reject) => {
        return sequelize.transaction((t) => {
            for (var i in delete_message_ids)
                promiseList.push(action.deleteMessage(delete_message_ids[i], t));
            return Promise.all(promiseList).then((message) => {
                return resolve(res.status(200).json({message: "Delete sucessful."}));
            })
                .catch(() => {
                    return reject(res.status(500));
                })
        })
    })
});
