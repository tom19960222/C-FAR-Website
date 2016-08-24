import * as Model from './models';
import {router as _router} from './route';
import * as _action from './action';
export * from './models';
export * from './route';
export let inited = false;

export function init(){
    inited = true;
    require('./passport'); // Initialize passport.
}

export let router = _router;
export let action = _action;
