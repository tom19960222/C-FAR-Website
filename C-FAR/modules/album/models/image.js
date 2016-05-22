/// <reference path="../../../../typings/node/node.d.ts" />
/// <reference path="../../../../typings/sequelize/sequelize.d.ts" />

var Sequelize = require('sequelize');

/*
    VARCHAR title
    VARCHAR summary
    VARCHAR content
    VARCHAR cover_image_url
    User creator
    INTEGER required_permission // 0: Anonymous 1: normal user 2: admin
    TINYINT visable
    INTEGER id // PK
*/

module.exports = function(sequelize){
    if(sequelize) {
        var Image = sequelize.define('Album_Image', {
            title: {
                type: Sequelize.STRING,
                allowNull: false
            },
            description: {
                type: Sequelize.STRING
            },
            url: {
                type: Sequelize.STRING
            },
            required_permission: {
                type: Sequelize.STRING,
                allowNull: false      
            },
            visable: {
               type: Sequelize.BOOLEAN,
               allowNull: false 
            }
        },
        {
            paranoid: true
        });   
    }
    return Image;
}