import * as Express from 'express';
import {restartWebsite} from './action';
export let router = Express.Router();

router.get('/action/restart', function(req, res, next){
    var ok = true;
    if (req.isUnauthenticated()){
        res.status(403).json({message: 'You have no permission to do it.'}).end();
        ok = false;
    }
    if(ok) next();
}, function(req, res){
    res.status(200).json({message: 'Starting to restart system, please wait a minute...'});

    // Reply to user first, or the program will have no chance to send response.
    restartWebsite();
});
