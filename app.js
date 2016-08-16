'use strict';

const http    = require('http'),
      Express = require('./src/servidor/server'),
      IO      = require('./src/servidor/socket');

let servidor = new Express();

let server = http.createServer(servidor.app);

server.listen(3000, ()=> console.log("El servidor se esta ejecutando en el puerto 3000"));

let socket = new IO({server:server});
socket.canales();

/*'use strict';

const express = require('express');

let app = express();

app.get('/',(sol, res)=>{
  res.send("Hola mundo en express! :o");
});

app.get('/node', (sol, res)=>{
  res.send("Nodejs");
});

app.listen(3000, ()=> console.log('El servidor se esta ejecutando en el puerto 3000 con express'));*/


/*const http = require('http');

let server = http.createServer((sol, res)=>{
  res.end("hello world! :)");
});

server.listen(3000, ()=> console.log('El servidor se esta ejecutando en el puerto 3000'));*/
