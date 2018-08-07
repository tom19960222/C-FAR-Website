import * as Express from 'express';
import * as bodyParser from 'body-parser';
import * as action from './action';
import {needLogin} from '../user';
import {app} from "../../app";
export let router = Express.Router();
let jsonParser = bodyParser.json({limit: '100mb'});
let sequelize = app.db.sql;

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
        background_data: req.body.background_data,
        background_filename: req.body.background_filename,
        content: req.body.content,
        link: req.body.link
        })
    .then((news) => {
        return action.getNewsList();
    })
    .then((newsList) => {
        return res.status(200).json(newsList);
    })
    .catch((err: Error) => {
        return res.status(500);
    })
});

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
});

router.delete('/', jsonParser, (req, res) => {
    let delete_news_ids = req.body.news_id;

    let promiseList = [];

    return new Promise((resolve, reject) => {
        return sequelize.transaction((t) => {
            for (var i in delete_news_ids)
                promiseList.push(action.deleteNews(delete_news_ids[i], t));
            return Promise.all(promiseList).then((member) => {
                return resolve(res.status(200).json({message: "Delete sucessful."}));
            })
            .catch(() => {
                return reject(res.status(500));
            })
        })
    })
});