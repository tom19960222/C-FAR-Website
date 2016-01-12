var Sequelize = require('sequelize');
var sequelize = new Sequelize('c-far', 'root', '123456@', {
  host: '192.168.99.100',
  dialect: 'mysql',
  port: 3306,
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  },
});

module.exports = sequelize;