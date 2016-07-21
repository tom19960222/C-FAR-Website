"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
let sequelize = app.db.sql;
const user_1 = require('./user');
let _User = user_1.User(sequelize);
exports.userModel = _User;
__export(require('./user'));
