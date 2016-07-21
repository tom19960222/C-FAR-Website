"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
const _action = require('./action');
const route_1 = require('./route');
exports.inited = false;
__export(require('./action'));
function init() {
    exports.inited = true;
}
exports.init = init;
exports.router = route_1.router;
exports.action = _action;
