var Article = require('./models').Article;
var User = require('../user/models').User;

var addArticle = function(title, summary, content, cover_image_url, creator, required_permission, visable){
    return Article.create({
        title: title,
        summary: summary,
        content: content,
        cover_image_url: cover_image_url,
        required_permission: required_permission,
        visable: visable
    })
    .then(function(_article){
          return User.findById(creator)
          .then(function(_user){
              _user.addArticle(_article);
              return _article.setCreator(_user);
          })
    })
};

var getArticle = function(id){
    return Article.findById(id);
}

var editArticle = function(id, title, summary, content, cover_image_url, required_permission, visable){
    var tmpArticle;
    return Article.findById(id)
    .then(function(_article){
        tmpArticle = _article;
        
        if(title) tmpArticle.title = title;
        if(summary) tmpArticle.summary = summary;
        if(content) tmpArticle.content = content;
        if(cover_image_url) tmpArticle.cover_image_url = cover_image_url;
        if(required_permission) tmpArticle.required_permission = required_permission;
        if(visable != undefined) tmpArticle.visable = visable;
        
        return tmpArticle.save();
    })
}

var deleteArticle = function(id){
    return Article.findById(id)
    .then(function(_article){
        return _article.destroy();
    })
}

module.exports.addArticle = addArticle;
module.exports.getArticle = getArticle;
module.exports.editArticle = editArticle;
module.exports.deleteArticle = deleteArticle;