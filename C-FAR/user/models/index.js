module.exports = function(sequelize){
    var models = {}
    models.User = require('./user')(sequelize);
    return models;
} 