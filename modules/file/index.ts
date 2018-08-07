import * as Express from 'express';
import * as _action from './action';
import {router as _router} from './route';
export let inited = false;
export * from './action';

export function init(){
    inited = true;
}

export let router = _router;
export let action = _action;
