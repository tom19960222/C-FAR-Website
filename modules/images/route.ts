import * as Express from 'express';
import * as bodyParser from 'body-parser';
import {fileAPI} from './';
import * as action from './action';
import {app} from "../../app";
export let router = Express.Router();
let sequelize = app.db.sql;
let jsonParser = bodyParser.json({limit: '100mb'});

router.get('/', (req, res) => {
    return action.getImageList()
    .then((imageList) => {
        return res.status(200).json(imageList);
    })
});

router.post('/', jsonParser, (req, res) => {
    return action.addImage(req.body.filename, req.body.content)
    .then(() => {
        return action.getImageList();
    })
    .then((imageList) => {
        return res.status(200).json(imageList);
    })
    .catch((err: Error) => {
        console.error(err);
        res.status(500).end();
    })
});

router.put('/:id', jsonParser, (req, res) => {
    if(req.body.filename == null || req.body.content == null)
        return res.status(400).end();
    return action.updateImage(parseInt(req.params.id), req.body.filename, req.body.content)
    .then((image) => {
        return action.getImageList();
    })
    .then((imageList) => {
        return res.status(200).json(imageList);
    })
    .catch((err: Error) => {
        if(err.message == "File not found")
            res.status(404).end();
        else {
            res.status(500).end();
            console.error(err);
        }
    })
});

router.delete("/", jsonParser, (req, res) => {
    let delete_image_ids = req.body.image_id;

    let promiseList = [];

    return new Promise((resolve, reject) => {
        return sequelize.transaction((t) => {
            for (var i in delete_image_ids)
                promiseList.push(action.deleteImage(delete_image_ids[i], t));
            return Promise.all(promiseList).then((image) => {
                return resolve(res.status(200).json({message: "Delete sucessful."}));
            })
                .catch(() => {
                    return reject(res.status(500));
                })
        })
    })
});