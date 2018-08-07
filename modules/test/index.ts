import * as Express from 'express';
import * as bodyParser from 'body-parser';
import * as fileAPI from '../file';

let file = fileAPI.action.register('/test', 'test');

export let router = Express.Router();
router.get('/test', (req, res) => {
    console.log('Imcoming YEE!');
    res.status(200).send("Let's YEE!").end();
})

router.post('/file',bodyParser.json({limit: '50mb'}), (req, res) => {
    return file.saveFile(req.body.filename, new Buffer(req.body.image, 'base64'))
    .then((result) => {
        return res.status(200).json({URI:result.URI});
    })
})

export let init = function(){

}
