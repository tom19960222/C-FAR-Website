var sequelize = require('../../db.js');

module.exports = {
    User: require('./user')(sequelize)
}