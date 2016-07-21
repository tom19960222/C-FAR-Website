"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
let sequelize = app.db.sql;
const image_1 = require('./image');
let _Image = image_1.Image(sequelize);
exports.imageModel = _Image;
__export(require('./image'));
