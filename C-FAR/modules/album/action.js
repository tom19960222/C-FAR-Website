var Album = require('./models').Album;
var User = require('../user/models').User;
var sequelize = app.db;

var addAlbum = function(title, optional_info){
    var Album, user;
    return sequelize.transaction(function(t){
        return Album.create({
            title: title,
            description: optional_info.description,
            cover_image_url: optional_info.cover_image_url,
            required_permission: required_permission,
            visable: visable
        }, {transaction: t})
        .then(function(_Album){
            Album = _Album;
            return User.findById(creator)
        }) 
        .then(function(_user){
            user = _user;
            return user.addAlbum(Album, {transaction: t});
        })
        .then(function(){
            return Album.setCreator(user, {transaction: t});
        })
        .catch(function(err){
            console.error('Add Album error!', err);
        })
    }) 
};

var getAlbum = function(id){
    return Album.findById(id);
}

var editAlbum = function(id, edit_items){
    var tmpAlbum;
    return sequelize.transaction(function(t){
        return Album.findById(id)
        .then(function(_Album){
            tmpAlbum = _Album;
            
            if(edit_items.title) tmpAlbum.title = edit_items.title;
            if(edit_items.description) tmpAlbum.description = edit_items.description;
            if(edit_items.cover_image_url) tmpAlbum.cover_image_url = edit_items.cover_image_url;
            if(edit_items.required_permission) tmpAlbum.required_permission = edit_items.required_permission;
            if(edit_items.visable != undefined) tmpAlbum.visable = edit_items.visable;
            
            return tmpAlbum.save({transaction: t});
        }) 
    }) 
}

var deleteAlbum = function(id){
    return sequelize.transaction(function(t){
       return Album.findById(id)
        .then(function(_Album){
            return _Album.destroy({transaction: t});
        }) 
    }) 
}

var addImage = function(title, optional_info){
    var Image, user;
    return sequelize.transaction(function(t){
        return Image.create({
            title: title,
            description: optional_info.description,
            cover_image_url: optional_info.cover_image_url,
            required_permission: required_permission,
            visable: visable
        }, {transaction: t})
        .then(function(_Image){
            Image = _Image;
            return User.findById(creator)
        }) 
        .then(function(_user){
            user = _user;
            return user.addImage(Image, {transaction: t});
        })
        .then(function(){
            return Image.setCreator(user, {transaction: t});
        })
        .catch(function(err){
            console.error('Add Image error!', err);
        })
    }) 
};

var getImage = function(id){
    return Image.findById(id);
}

var editImage = function(id, edit_items){
    var tmpImage;
    return sequelize.transaction(function(t){
        return Image.findById(id)
        .then(function(_Image){
            tmpImage = _Image;
            
            if(edit_items.title) tmpImage.title = edit_items.title;
            if(edit_items.description) tmpImage.description = edit_items.description;
            if(edit_items.cover_image_url) tmpImage.cover_image_url = edit_items.cover_image_url;
            if(edit_items.required_permission) tmpImage.required_permission = edit_items.required_permission;
            if(edit_items.visable != undefined) tmpImage.visable = edit_items.visable;
            
            return tmpImage.save({transaction: t});
        }) 
    }) 
}

var deleteImage = function(id){
    return sequelize.transaction(function(t){
       return Image.findById(id)
        .then(function(_Image){
            return _Image.destroy({transaction: t});
        }) 
    }) 
}

module.exports.addAlbum = addAlbum;
module.exports.getAlbum = getAlbum;
module.exports.editAlbum = editAlbum;
module.exports.deleteAlbum = deleteAlbum;