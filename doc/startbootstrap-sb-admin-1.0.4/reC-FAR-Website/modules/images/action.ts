/// <reference path="../../typings/index.d.ts" />
import {imageModel, imageInstance, imageAttributes} from './models';
import {router} from './route';
import * as fs from 'fs';
import * as path from 'path';
import * as Promise from 'bluebird';
import {EventEmitter} from 'events';
import * as Express from 'express';
import {fileAPI} from './';
import {FileAPIResult} from '../file';


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

export function deleteImage(fileID: number): Promise<void>{
    return imageModel.findById(fileID)
    .then((file) => {
        return file.destroy();
    })
}

export function isImageExist(IdOrFilename: number|string): Promise<boolean>{
    if (typeof IdOrFilename == 'string'){
        return imageModel.findOne({where: {filename: IdOrFilename}})
        .then((result) => {
            if (result != null)
                return true;
            return false;
        })
    }
    else if (typeof IdOrFilename == 'number'){
        return imageModel.findById(IdOrFilename)
        .then((result) => {
            if (result != null)
                return true;
            return false;
        })
    }
    else return new Promise<boolean>((resolve, reject) => {resolve(false)});

}
