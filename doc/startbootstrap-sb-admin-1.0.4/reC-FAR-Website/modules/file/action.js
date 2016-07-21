"use strict";
const route_1 = require('./route');
const fs = require('fs');
const path = require('path');
const Promise = require('bluebird');
const Express = require('express');
const mkdirp = require('mkdirp');
const crypto = require('crypto');
fs['statAsync'] = Promise.promisify(fs.stat);
fs['writeFileAsync'] = Promise.promisify(fs.writeFile);
let mkdirpAsync = Promise.promisify(mkdirp);
let staticStorage = app.config.staticStorage;
function register(mountPath, moduleName) {
    console.log("Register from", moduleName, ", mount at /assets" + mountPath);
    let dirname = path.join(staticStorage, moduleName);
    try {
        fs.statSync(dirname);
    }
    catch (error) {
        mkdirp(dirname, (err) => {
            if (err != null) {
                console.log("Error creating directory!", err);
                throw err;
            }
        });
    }
    route_1.router.use(mountPath, Express.static(dirname));
    let APIInstance = {
        saveFile: function (originalFilename, data) {
            return new Promise((resolve, reject) => {
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
                        let result = {
                            URI: path.join('/assets', mountPath, filename[0], filename[1], filename),
                            filename: filename
                        };
                        return resolve(result);
                    });
                });
            });
        }
    };
    return APIInstance;
}
exports.register = register;
