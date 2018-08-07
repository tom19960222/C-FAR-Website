import * as Express from 'express';
import * as bodyParser from 'body-parser';
import * as action from './action';
import {needLogin} from '../user';
import {app} from "../../app";
export let router = Express.Router();
let jsonParser = bodyParser.json({limit: '100mb'});
let sequelize = app.db.sql;

router.get('/', (req, res) => {
    return action.getArticleList()
    .then((articleList) => {
        for (var i in articleList)
            articleList[i].dataValues.link = '/article/show/' + articleList[i].article_id;
        return res.status(200).json(articleList);
    })
    .catch((err: Error) => {
        return res.status(500);
    })
});

router.get('/show/:id', (req, res) => {
    return action.getArticle(req.params['id'])
    .then((article) => {
        if (article == null)
            return res.status(404).json({message: `Can't find that article.`});
        return res.status(200).render("form-page",
        {   content: article.rendered_HTML,
            title: action.renderTitleHTML(article.title),
            background: article.background_url
        });
    });
});

router.get('/rebuild', (req, res) => {
    return action.rebuildAllArticleHTML()
        .then((articleList) => {
            return res.status(200).json(articleList);
        })
        .catch((err: Error) => {
            return res.status(500);
        })
});

router.get('/:id', (req, res) => {
    return action.getArticle(req.params['id'])
    .then((article) => {
        if (article == null)
            return res.status(404).json({message: `Can't find that article.`});
        return res.status(200).json(article);
    });
});

router.post('/', needLogin, jsonParser, (req, res) => {
    return action.addArticle(req.user.user_id, {
        title: req.body.title,
        author: req.body.author,
        content: req.body.content,
        required_permission: req.body.required_permission,
        visable: req.body.visable,
        background_data: req.body.background_data,
        background_filename: req.body.background_filename
        })
    .then((article) => {
        return res.status(200).json(article);
    })
});

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
});

router.delete('/', jsonParser, (req, res) => {
    let delete_article_ids = req.body.article_id;

    let promiseList = []

    return new Promise((resolve, reject) => {
        return sequelize.transaction((t) => {
            for (var i in delete_article_ids)
                promiseList.push(action.deleteArticle(delete_article_ids[i], t));
            return Promise.all(promiseList).then((member) => {
                return resolve(res.status(200).json({message: "Delete sucessful."}));
            })
        })
    })
});
