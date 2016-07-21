import * as Express from 'express';
import * as bodyParser from 'body-parser';
import {fileAPI} from './';
import * as action from './action';
export let router = Express.Router();
let jsonParser = bodyParser.json({limit: '100mb'});

router.get('/', (req, res) => {
    return action.getImageList()
    .then((imageList) => {
        return res.status(200).json(imageList);
    })
})

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
})

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
})
