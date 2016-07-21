"use strict";
const Sequelize = require('sequelize');
function Image(sequelize) {
    let _Image;
    if (sequelize) {
        _Image = sequelize.define('image', {
            filename: {
                type: Sequelize.STRING,
                allowNull: false
            },
            original_filename: {
                type: Sequelize.STRING
            },
            path: {
                type: Sequelize.STRING
            },
            image_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
                unique: true
            }
        });
    }
    return _Image;
}
exports.Image = Image;
