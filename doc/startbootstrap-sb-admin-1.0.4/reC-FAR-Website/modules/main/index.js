"use strict";
const FileAPI = require('../file');
const route_1 = require('./route');
exports.inited = false;
exports.fileAPI = FileAPI.action.register('/main', 'main');
function init() {
    exports.inited = true;
}
exports.init = init;
exports.router = route_1.router;
