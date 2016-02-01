/// <reference path="../../typings/bluebird/bluebird.d.ts" />
var Express = require('express');
var Promise = require('bluebird');
var fs = require('fs');
var pathToRegexp = require('path-to-regexp')
var realpathAsync = Promise.promisify(fs.realpath);
var Router = require('./route');

var register = function (path, dirname){
    return new Promise(function(resolve, reject){
        var allRoutes = [];
        realpathAsync(dirname)
                .then(function(realDirname){
                    var routerInfo = Router.use(path, Express.static(realDirname));
                    
                    for(var i in Router.stack){
                        if(allRoutes.indexOf(Router.stack[i].regexp.toString()) >= 0){
                            Router.stack.slice(i);
                            return reject(new Error('Path already exists.'));
                        }
                        else
                            allRoutes.push(Router.stack[i].regexp.toString());
                    }
                    console.info("Mounted static path %s at %s", realDirname, path);
                    return resolve(routerInfo);
                }); 
        
           
    });
}

var deRegister = function(path){
    return new Promise(function(resolve, reject){
        for (var i in Router.stack){
            if(Router.stack[i].route.path === path)
                resolve(Router.stack.splice(i));
        }
        reject('Path not exists.');
    })
}

module.exports.register = register;
module.exports.deRegister = deRegister;