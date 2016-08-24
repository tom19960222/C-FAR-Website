/// <reference path="../../typings/index.d.ts" />
import {router} from './route';
import * as fs from 'fs';
import * as path from 'path';
import * as Promise from 'bluebird';
import {EventEmitter} from 'events';
import * as Express from 'express';
import * as mkdirp from 'mkdirp';
import * as crypto from 'crypto';
import {app} from "../../app";

fs['statAsync'] = Promise.promisify(fs.stat);
fs['writeFileAsync'] = Promise.promisify(fs.writeFile);
let mkdirpAsync = Promise.promisify(mkdirp);

let staticStorage: String = app.config.staticStorage;

export interface FileAPIInstance {
    saveFile(originalFilename:string, data: Buffer): Promise<FileAPIResult>;
}

export interface FileAPIResult {
    URI: string;
    filename: string;
}

export function register(mountPath: string, moduleName: string): FileAPIInstance{
    console.log("Register from", moduleName, ", mount at /assets" + mountPath);
    let dirname = path.join(staticStorage, moduleName);

    try {fs.statSync(dirname)}
    catch(error){
        mkdirp(dirname, (err) => {
            if(err != null){
                console.log("Error creating directory!", err);
                throw err;
            }
        });
    }

    router.use(mountPath, Express.static(dirname));
    let APIInstance: FileAPIInstance = {
        saveFile: function(originalFilename:string, data: Buffer): Promise<FileAPIResult>{
            return new Promise<FileAPIResult>((resolve, reject) => {

                // Redeclare dirname, or dirname outside will be used.
                let dirname = path.join(staticStorage, moduleName);
                let hash = crypto.createHash('sha512');
                hash.update(data);
                let filename = hash.digest('hex') + '.' + originalFilename.split('.').pop();
                dirname = path.join(dirname, filename[0], filename[1]);

                return mkdirpAsync(dirname)
                .then(() => {
                    return fs.writeFile(path.join(dirname, filename), data, (err) => {
                        if (err != null) {
                            console.log("Error writing file!", err);
                            return reject(err);
                        }
                        let result: FileAPIResult = {
                            URI: path.join('/assets', mountPath, filename[0], filename[1], filename),
                            filename: filename
                        }
                        return resolve(result);
                    })
                })
            })
        }
    }
    return APIInstance;
}
