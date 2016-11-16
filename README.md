# wsm: WebSocket Manager - a websocket library for node.js and client-side

[![Build Status](https://travis-ci.org/jefftham/wsm.svg?branch=develop)](https://travis-ci.org/jefftham/wsm)
[![Join the chat at https://gitter.im/JeffTham/wsm](https://badges.gitter.im/JeffTham/wsm.svg)](https://gitter.im/JeffTham/wsm?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
[![npm](https://img.shields.io/npm/l/express.svg)](https://github.com/jefftham/wsm)

`wsm` is a simple and useful solution for using WebSocket in both Node.js (server-side) and browser (client-side).

`wsm` can create a WebSocket Server easily from node.js.

`wsm` can be used in client-side to build WebSocket connection easily; futhermore, `wsm` can reconnect itself and run specific functions if the connection drop.

`wsm` takes the fastest websocket library - [ws](http://websockets.github.com/ws) as dependency and provides an easy method to handle connection and message between server and client instantly.

### Important note:
Only several functions in this library you should care about:-
* wsm.wss - a reference to [`ws`](http://websockets.github.com/ws) instance.
* wsm.addhandler('type', callback) - run the callback function when receive 'type' from the other end.
* wsm.deleteHandler('type') - delete the added handler.
* wsm.handlerList() - list all added handlers.
* wsm.send('type',content) - send the content to the other end as 'type'.

the send function will wrap/stringify as '{"type":"type","content":"message content"}'   

the addHandler() should be coded as 

`wsm.addHandler('type', function(message){ console.log(message.content); })`

`wsm` only take TWO type of arguments:-
* object - (server-side) attached http/https server to WebSocket server. 
    * Eg. `var wsm = new WSM ( {server:server} );`
* function - (server-side/client-side) a callback function run when Websocket connected or reconnected. 
    * Eg. `var wsm = new WSM ( function(wsm){wsm.addHandler('type',function(message){console.log(message.content);})} );`



### Installing

```
npm install wsm --save
```

### ExpressJS example 1

```js
var http = require('http');
var express = require('express');
var app = express();
var port = 8080;
app.listen(port);
var server = http.createServer(app);

app.use(function (req, res) {
  res.send({ msg: "hello" });
});

var WSM = require('wsm');
var wsm = new WSM ( {server:server} );
```

### ExpressJS example 2 (run a callback function when WebSocket is connected or reconnected)

```js
var http = require('http');
var express = require('express');
var app = express();
var port = 8080;
app.listen(port);
var server = http.createServer(app);

app.use(function (req, res) {
  res.send({ msg: "hello" });
});

//reactive function for websocket manager, this will include all the handlers
function reactive(wsm){
    wsm.addHandler(
        'test'
        ,function(message){
                wsm.send('test','a test message from server.')
        }
    );
}

var WSM = require('wsm');
var wsm = new WSM ({server:server} , reactive);  //position of the arguments does not matter.
```

### Server Sending and receiving data

```js
var WSM = require('wsm');
var wsm = new WSM ( {server:server} );

//send a type of message to the other end. (from server to client or from client to server)

/*
 * @param {string}  type - any type that added through addHandler()
 * @param {*}       content - can be string,object,array, or anything.it will show as message.content on the other end.
 * @example      wsm.send('any','just say hello.')
 *              //the send function will wrap/stringify both 'type' & 'content'
 *              // '{"type":"type1","content":"message content"}'
 */
wsm.send('type1','message content');


//add a handler to respond the message sent from the other end.

/*
 * @param {string}      type - the type that websocket manager care about.
 * @param {function}    cb - a callback function that run for the type, the parse message is the only parameter.
 * @example             wm.addHandler('welcome',function(message){console.log(message.content)})
 */
wsm.addHandler('type1',function(message){console.log(message.content)})
```


### Server sending broadcast data

```js
var WSM = require('wsm');
var wsm = new WSM ( {server:server} );

wsm.broadcast('message type','message content');
```

### The created websocket server reference

```js
var WSM = require('wsm');
var wsm = new WSM ( {server:server} );

//you can use anything from original 'ws' websocket node module.
wsm.wss

//original send function from 'ws' websocket node module.
wsm.wss.send('somthing');

```

### Browser client-side example

```html

<script src="wsm.js"></script>
<script>
    //reactive function for websocket manager, this will include all the handlers
    function reactive(wsm){
        wsm.addHandler(
            'test'
            ,function(message){
                    wsm.send('test','a test message from browser.')
            }
        );
    }

    var wsm = new WSM(  reactive  );

    //or simple as
    //var wsm = new WSM();

</script>


```



## License

(The MIT License)

Copyright (c) 2016 Jeff Tham &lt;Jeff.Tham@email.com&gt;

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
