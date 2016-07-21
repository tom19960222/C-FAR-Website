/// <reference path="../../typings/index.d.ts" />
import * as Express from 'express';
import * as Path from 'path';
export let router = Express.Router();

let pages = {
    '/': 'index',
    '/work': 'work-page',
    '/story': 'story-page',
    '/new-things': 'new-things-page',
    '/future': 'future-page',
    '/information': 'information-page',
    '/form': 'form-page',
    '/one': 'future1',
    '/two': 'future2',
    '/three': 'future3',
    '/four': 'future4',
    '/five': 'future5',
    '/six': 'future6',
    '/seven': 'future7',
    '/eight': 'future8',
    '/nine': 'future9',
    '/ten': 'future10',
    '/error': 'error',
    '/login': 'login',
    '/manage': 'manage',
    '/meeting': 'meeting',
    '/member-manage': 'member-manage',
    '/article-manage': 'article-manage',
    '/share-manage': 'share-manage',
    '/album-manage': 'album-manage'
}

Object.keys(pages).forEach((route) => {
    router.get(route, (req, res) => {
        res.render(pages[route]);
    });
    console.log("Mounted page", pages[route], "at", route);
});
