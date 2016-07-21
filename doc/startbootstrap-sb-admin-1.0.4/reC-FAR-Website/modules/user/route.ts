/// <reference path="../../typings/index.d.ts" />

import * as Express from 'express';
import * as action from './action';
import * as model from './models';
import {userInstance, userAttributes} from './models/user';
import * as bodyParser from 'body-parser';
import * as passport from 'passport';

let jsonParser = bodyParser.json();

export function needLogin (req: Express.Request, res: Express.Response, next: Function){
    if(req.isAuthenticated())
        return next();
    else
        return res.status(401).end();
}

export let router = Express.Router();

router.use('/assets', Express.static(__dirname + '/public/assets'));

router.post('/add', jsonParser, function(req: Express.Request, res: Express.Response, next: Function): Promise<any>{
    let body = req.body;
    return action.addUser(body.nickname, body.email, body.password, body.permission, body.language,
    {
        firstname: body.firstname,
        lastname: body.lastname,
        head_image_url: body.head_image_url,
        core_concept: body.core_concept,
        job_title: body.job_title,
        birthday: body.birthday,
        profession: body.profession,
        interest: body.interest,
        gender: body.gender,
        facebook_id: body.facebook_id,
        twitter_id: body.twitter_id,
        skype_id: body.skype_id
    })
    .then(function(user: userInstance){
        res.status(201).json({message: 'User added.'});
    })
    .error(function(err){
        res.status(500).json({message: 'User add failed - ' + err});
    })
});

router.get('/detail', function(req: Express.Request, res: Express.Response, next: Function){
    res.status(501).send("<h1>Not implemented</h1>");
});

router.post('/edit', function(req: Express.Request, res: Express.Response, next: Function){
    res.status(501).send("<h1>Not implemented</h1>");
});

router.post('/delete', function(req: Express.Request, res: Express.Response, next: Function){
    res.status(501).send("<h1>Not implemented</h1>");
});

router.post('/login', jsonParser, passport.authenticate('local'), function(req: Express.Request, res: Express.Response, next: Function){
    res.status(200).json(req.user);
    // res.status(200).json({message: 'Login successed.'});
});

router.get('/logout', function(req: Express.Request, res: Express.Response, next: Function){
    req.logout();
    res.status(200).json({message: 'Logout successed.'});
});
