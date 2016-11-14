# wsm: a node.js websocket library


`wsm` is a simple and useful solution for using WebSocket in both Node.js (server-side) and browser (client-side).

`wsm` can create a WebSocket Server easily from node.js.

`wsm` can be used in client-side to build WebSocket connection easily; futhermore, `wsm` can reconnect itself and run specific functions if the connection drop.

`wsm` takes the fastest websocket library - [ws](http://websockets.github.com/ws) as dependency and provides an easy method to handle connection and message between server and client instantly.

### Installing

```
npm install --save wsm
```

### ExpressJS example

```js
var server = require('http').createServer()
  , url = require('url')
  , WebSocketServer = require('ws').Server
  , express = require('express')
  , app = express()
  , port = 4080;

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
var wsm = new WSM (reactive,{server:server});
```


### Server Sending and receiving data

```js
var WSM = require('wsm');
var wsm = new WSM (null,{server:server});

//send a type of message to the other end. (from server to client or from client to server)

/*
 * @param {string}  type - any type that added through addHandler()
 * @param {*}       content - can be string,object,array, or anything.it will show as message.content on the other end.
 * @example         wsm.send('any','just say hello.')
 */
wsm.send('type1','message content')

//add a handler to re-act different type of message. 

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
var wsm = new WSM (null,{server:server});

wsm.broadcast('message type','message content');
```

### The created websocket server reference

```js
var WSM = require('wsm');
var wsm = new WSM (null,{server:server});

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

    var https_connection = false;

    var wsm = new WSM(  reactive , https_connection  );

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
