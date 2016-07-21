"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
let sequelize = app.db.sql;
const message_1 = require('./message');
let _Message = message_1.Message(sequelize);
exports.messageModel = _Message;
__export(require('./message'));
