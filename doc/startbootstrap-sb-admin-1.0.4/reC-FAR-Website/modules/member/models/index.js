"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
let sequelize = app.db.sql;
const member_1 = require('./member');
let _Member = member_1.Member(sequelize);
exports.memberModel = _Member;
__export(require('./member'));
