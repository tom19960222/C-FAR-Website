"use strict";
const Express = require('express');
exports.router = Express.Router();
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
    '/manageXD': 'manageHTML/index'
};
Object.keys(pages).forEach((route) => {
    exports.router.get(route, (req, res) => {
        res.render(pages[route]);
    });
    console.log("Mounted page", pages[route], "at", route);
});
