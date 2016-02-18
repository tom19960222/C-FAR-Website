var config = require('./config');
var Docker = require('dockerode');
var docker = new Docker(config.docker);

var webcontainer = docker.getContainer('cfar_web_1');

var restartWebsite = function(){
    return webcontainer.restart();
}

module.exports.restartWebsite = restartWebsite;