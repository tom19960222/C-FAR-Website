import * as FileAPI from '../file';
import * as Express from 'express';
import * as _action from './action';
import {router as _router} from './route';
export let inited = false;
export let fileAPI = FileAPI.action.register('/article', 'article');

export function init(){
    inited = true;
}

export let router = _router;
export let action = _action;
