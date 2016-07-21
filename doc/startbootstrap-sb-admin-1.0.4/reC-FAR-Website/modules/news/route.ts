import * as Express from 'express';
import * as bodyParser from 'body-parser';
import * as action from './action';
import {needLogin} from '../user';
export let router = Express.Router();
let jsonParser = bodyParser.json({limit: '100mb'});

router.get('/', (req, res) => {
    return action.getNewsList()
    .then((newsList) => {
        return res.status(200).json(newsList);
    })
    .catch((err: Error) => {
        return res.status(500);
    })
});

router.post('/', needLogin, jsonParser, (req, res) => {
    return action.addNews(req.user.user_id, {
        title: req.body.title,
        summary: req.body.summary,
        content: req.body.content,
        required_permission: req.body.required_permission,
        visable: req.body.visable
        })
    .then((news) => {
        return action.getNewsList();
    })
    .then((newsList) => {
        return res.status(200).json(newsList);
    })
})

router.put('/', jsonParser, (req, res) => {
    return action.bulkUpdateNews(req.body)
    .then((news) => {
        return action.getNewsList();
    })
    .then((newsList) => {
        return res.status(200).json(newsList);
    })
    .catch((err: Error) => {
        if(err.message == "News not found!")
            res.status(404).end();
        else
            res.status(500).end();
    })
})
