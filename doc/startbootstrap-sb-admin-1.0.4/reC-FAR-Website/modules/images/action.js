"use strict";
const models_1 = require('./models');
const Promise = require('bluebird');
const _1 = require('./');
function addImage(filename, content) {
    return _1.fileAPI.saveFile(filename, new Buffer(content, 'base64'))
        .then((result) => {
        return models_1.imageModel.create({
            filename: result.filename,
            original_filename: filename,
            path: result.URI
        });
    });
}
exports.addImage = addImage;
function getImageList() {
    return models_1.imageModel.findAll();
}
exports.getImageList = getImageList;
function updateImage(fileID, originalFilename, content) {
    return isImageExist(fileID)
        .then((imageExist) => {
        if (imageExist) {
            return _1.fileAPI.saveFile(originalFilename, new Buffer(content, 'base64'))
                .then((result) => {
                return models_1.imageModel.findById(fileID)
                    .then((file) => {
                    file.filename = result.filename;
                    file.path = result.URI;
                    file.original_filename = originalFilename;
                    return file.save();
                });
            });
        }
        else
            throw new Error("File not found");
    });
}
exports.updateImage = updateImage;
function deleteImage(fileID) {
    return models_1.imageModel.findById(fileID)
        .then((file) => {
        return file.destroy();
    });
}
exports.deleteImage = deleteImage;
function isImageExist(IdOrFilename) {
    if (typeof IdOrFilename == 'string') {
        return models_1.imageModel.findOne({ where: { filename: IdOrFilename } })
            .then((result) => {
            if (result != null)
                return true;
            return false;
        });
    }
    else if (typeof IdOrFilename == 'number') {
        return models_1.imageModel.findById(IdOrFilename)
            .then((result) => {
            if (result != null)
                return true;
            return false;
        });
    }
    else
        return new Promise((resolve, reject) => { resolve(false); });
}
exports.isImageExist = isImageExist;
