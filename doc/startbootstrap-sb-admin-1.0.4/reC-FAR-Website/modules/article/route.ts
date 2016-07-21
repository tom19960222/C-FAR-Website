import * as Express from 'express';
import * as bodyParser from 'body-parser';
import * as action from './action';
import {needLogin} from '../user';
export let router = Express.Router();
let jsonParser = bodyParser.json({limit: '100mb'});

router.get('/', (req, res) => {
    return action.getArticleList()
    .then((articleList) => {
        return res.status(200).json(articleList);
    })
    .catch((err: Error) => {
        return res.status(500);
    })
});

router.post('/', needLogin, jsonParser, (req, res) => {
    return action.addArticle(req.user.user_id, {
        title: req.body.title,
        link: req.body.link,
        content: req.body.content,
        required_permission: req.body.required_permission,
        visable: req.body.visable,
        background_data: req.body.background_data,
        background_filename: req.body.background_filename
        })
    .then((article) => {
        return action.getArticleList();
    })
    .then((articleList) => {
        return res.status(200).json(articleList);
    })
})

router.put('/', jsonParser, (req, res) => {
    return action.bulkUpdateArticle(req.body)
    .then((article) => {
        return action.getArticleList();
    })
    .then((articleList) => {
        return res.status(200).json(articleList);
    })
    .catch((err: Error) => {
        if(err.message == "Article not found!")
            res.status(404).end();
        else
            res.status(500).end();
    })
})
