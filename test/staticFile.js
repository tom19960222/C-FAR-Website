/// <reference path="../typings/assert/assert.d.ts" />
/// <reference path="../typings/mocha/mocha.d.ts" />

var assert = require('assert');
var staticFile = require('../C-FAR/staticFile');
var util = require('util');

describe('staticFile#register', function(){
    it('should register the path where this script living in', function(done){
        staticFile.register('/test', __dirname)
        .then(function(router){
            assert.equal(router.stack.length, 1);
            done();
        })
    })
});

describe('staticFile#deRegister', function(){
    it('should deregister the path just added', function(done){
        staticFile.deRegister('/test').then(function(router){
            assert.equal(router.stack.length, 0);
            done();
        })
    })
})