'use strict';

const io = require('socket.io');

class SocketIO {
  constructor(config){
    this.config = config || {};
    this.io = io.listen(this.config.server);
  }

  canales(){
    this.io.on('connection',(socket)=>{
      socket.on('mensaje',(data)=>{
        this.io.emit('mensajeAll',data);
      });
    });
  }
}

module.exports = SocketIO;
