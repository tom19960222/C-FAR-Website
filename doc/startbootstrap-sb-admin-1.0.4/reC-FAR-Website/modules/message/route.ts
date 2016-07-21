import * as Express from 'express';
import * as bodyParser from 'body-parser';
import * as action from './action';
export let router = Express.Router();
let jsonParser = bodyParser.json({limit: '100mb'});

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
})
