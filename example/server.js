var server = require('http').createServer();
var url = require('url');
var express = require('express');
var app = express();
var port = 80;


/*app.use(function (req, res) {
  res.send({ msg: "hello" });
});*/

var publicFolder=  './www/';    

//makes the files in the publicFolder are visible to public. (js, img, css files should be placed inside of publicFolder)
app.use(express.static(publicFolder));

server.on('request', app);
server.listen(port, function () { console.log('Listening on ' + server.address().port) });

//var server = http.createServer(app);

//reactive function for websocket manager, this will include all the handlers
function reactive(wsm){
    wsm.addHandler(
        'test'
        ,function(message){
                console.log(message.content);
        }
    );

    wsm.send('test','a test message from server.');
}

var WSM = require('wsm');
var wsm = new WSM ( {server:server} , reactive );  //position of the arguments does not matter.

