/// <reference path="../../typings/index.d.ts" />
import {imageModel, imageInstance, imageAttributes} from './models';
import * as Promise from 'bluebird';
import {fileAPI} from './';
import {Transaction} from "~sequelize/index";
import {app} from "../../app";
let sequelize = app.db.sql;


export function addImage(filename: string, content: string): Promise<imageInstance>{
    return fileAPI.saveFile(filename, new Buffer(content, 'base64'))
    .then((result) => {
        return imageModel.create({
            filename: result.filename,
            original_filename: filename,
            path: result.URI
        })
    })
}

export function getImageList(): Promise<imageInstance[]>{
    return imageModel.findAll()
}

export function updateImage(fileID: number, originalFilename:string, content: string): Promise<imageInstance>{
    return isImageExist(fileID)
    .then((imageExist) => {
        if (imageExist){
            return fileAPI.saveFile(originalFilename, new Buffer(content, 'base64'))
            .then((result) => {
                return imageModel.findById(fileID)
                .then((file) => {
                    file.filename = result.filename;
                    file.path = result.URI;
                    file.original_filename = originalFilename;
                    return file.save();
                })
            })
        }
        else throw new Error("File not found");
    })
}

export function deleteImage(fileID: number, t?: Transaction): Promise<void>{
    if(t != null)
        return imageModel.findById(fileID, {transaction: t})
            .then((file) => {
                return file.destroy({transaction: t});
            });
    else
        return sequelize.transaction(t => {
            return imageModel.findById(fileID, {transaction: t})
                .then((file) => {
                    return file.destroy({transaction: t});
                });
        })

}

export function isImageExist(IdOrFilename: number|string): Promise<boolean>{
    if (typeof IdOrFilename == 'string'){
        return imageModel.findOne({where: {filename: IdOrFilename}})
        .then((result) => {
            return result != null;
        })
    }
    else if (typeof IdOrFilename == 'number'){
        return imageModel.findById(IdOrFilename)
        .then((result) => {
            return result != null;
        })
    }
    else return new Promise<boolean>((resolve, reject) => {resolve(false)});

}
