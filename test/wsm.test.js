//create a server with express.js

var assert = require('chai').assert;
var http = require('http');
var express = require('express');
var app = express();
var port = 8080;


app.get('/', function (req, res) {
  res.send('Hello World')
});

//app.listen(port);

var server = http.createServer(app);

/* function reactive(wsm){
    wsm.addHandler('testing',function(message){return message.content;});
 }*/

var WSM = require('../lib/wsm.js');

var wsm = new WSM( {server:server}  );

//add a handler 
wsm.addHandler('testing',function(message){return message.content});


describe('wsm.wss Tests',function(){
    describe('Created a server and attached to wsm',function(){

        it('attached wss to wsm as wsm.wss',function(done){
            assert.ok(typeof(wsm.wss) === 'object','typeof wsm.wss is an object');
            done();
        });

        it('typeof wsm.wss.domain',function(done){
            assert.ok(typeof(wsm.wss.domain) === 'object','typeof wsm.wss.domain is an object');
            done();
        });

        it('wsm.wss.options.server',function(done){
            assert.ok(typeof(wsm.wss.options.server) === 'object','wsm.wss.options.server is an object');
            done();
        });

    });    
});



describe('wsm functions Tests',function(){
    describe('wsm function test 1 ',function(){

        it('handlerList test 1',function(done){
            assert.ok(typeof(wsm.handlerList) === 'function','typeof wsm.handlerList is a function');
            done();
        });

        it('handlerList test 2',function(done){
            assert.notEqual(wsm.handlerList().indexOf('testing'), -1 , 'type "testing" should be added to the handler')
            done();
        });

    });   

    describe('wsm function test 2 ',function(){

        it('deleteHandler test 1',function(done){
            assert.ok(typeof(wsm.deleteHandler) === 'function','typeof wsm.deleteHandler is a function');
            done();
        });

        it('deleteHandler test 2',function(done){
            assert.equal(wsm.deleteHandler('testing'), true , 'deleted handler "testing"')
            done();
        });

        it('deleteHandler test 3',function(done){
            assert.equal(wsm.deleteHandler('testing'), false , 'deleted handler that is not in the handlerList')
            done();
        });

        it('deleteHandler test 4',function(done){
            assert.equal(wsm.handlerList().indexOf('testing'), -1 , 'type "testing" should be added to the handler')
            done();
        });

    });   
});



