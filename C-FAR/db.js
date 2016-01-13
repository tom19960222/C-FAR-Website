var Sequelize = require('sequelize');
var sequelize = new Sequelize('c-far', 'root', '123456@', {
  host: '163.13.128.116',
  dialect: 'mysql',
  port: 33060,
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  },
});

module.exports = sequelize;