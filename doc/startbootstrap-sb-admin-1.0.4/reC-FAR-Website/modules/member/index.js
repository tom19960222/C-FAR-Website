"use strict";
const FileAPI = require('../file');
const _action = require('./action');
const route_1 = require('./route');
exports.inited = false;
exports.fileAPI = FileAPI.action.register('/member', 'member');
function init() {
    exports.inited = true;
}
exports.init = init;
exports.router = route_1.router;
exports.action = _action;
