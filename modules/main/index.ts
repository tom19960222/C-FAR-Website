import * as FileAPI from '../file';
import * as Express from 'express';
import {router as _router} from './route';
export let inited = false;
export let fileAPI = FileAPI.action.register('/main', 'main');

export function init(){
    inited = true;
}

export let router = _router;
