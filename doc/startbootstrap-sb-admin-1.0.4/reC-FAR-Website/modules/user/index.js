"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
const route_1 = require('./route');
const _action = require('./action');
__export(require('./models'));
__export(require('./route'));
exports.inited = false;
function init() {
    exports.inited = true;
    require('./passport');
}
exports.init = init;
exports.router = route_1.router;
exports.action = _action;
