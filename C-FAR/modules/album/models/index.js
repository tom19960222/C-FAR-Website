var sequelize = app.db;
var User = require('../../user/models').User;

var Album = require('./article')(sequelize);
var Image = require('./image')(sequelize);

Album.belongsTo(User, {as: 'creator'});
User.hasMany(Album);

Album.hasMany(Image);
Image.belongsTo(Album);

module.exports = {
    Album: Album,
    Image: Image
}