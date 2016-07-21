"use strict";
const Express = require('express');
const bodyParser = require('body-parser');
const action = require('./action');
exports.router = Express.Router();
let jsonParser = bodyParser.json({ limit: '100mb' });
exports.router.get('/', (req, res) => {
    return action.getImageList()
        .then((imageList) => {
        return res.status(200).json(imageList);
    });
});
exports.router.post('/', jsonParser, (req, res) => {
    return action.addImage(req.body.filename, req.body.content)
        .then(() => {
        return action.getImageList();
    })
        .then((imageList) => {
        return res.status(200).json(imageList);
    })
        .catch((err) => {
        console.error(err);
        res.status(500).end();
    });
});
exports.router.put('/:id', jsonParser, (req, res) => {
    if (req.body.filename == null || req.body.content == null)
        return res.status(400).end();
    return action.updateImage(parseInt(req.params.id), req.body.filename, req.body.content)
        .then((image) => {
        return action.getImageList();
    })
        .then((imageList) => {
        return res.status(200).json(imageList);
    })
        .catch((err) => {
        if (err.message == "File not found")
            res.status(404).end();
        else {
            res.status(500).end();
            console.error(err);
        }
    });
});
