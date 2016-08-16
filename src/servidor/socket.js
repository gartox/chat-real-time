'use strict';//El metodo estricto lo usamos para poder abilitar opciones como las variables let y clases que no estan disponibles
//normalmente

const io = require('socket.io'); //Requerimos el modulo socket.io y lo guardamos en una constante

class SocketIO {//Iniciamos la clase 
  constructor(config){//Creamos un constructor el cual recibira un parametro
    this.config = config || {};//Agregamos una variable de la clase a la que le daremos como valor el parametro recibido, si el 
    //parametro esta vacio le pasamos un objeto vacio para que tengo algo que manipular y controlemos los errores que puedan aparecer
    this.io = io.listen(this.config.server);//Agregamos otra variable y le pasamos el servidor socket.io y le decimos que escuche en el servidor que ejecutamos en el archivo app.js
  }

  canales(){//Creamos el metodo canales el que nos permitira abrir los canales
    this.io.on('connection',(socket)=>{//Le decimos que el servidor estara escuchando un evento con "on" y el evento sera 'connection', cuanoo se ejecute el evento
      //recibira un parametro que sera un socket
      socket.on('mensaje',(data)=>{//Usamos el socket de conexion le decimos que estara esuchando un evento con "on" y ese vento sera mensaje(este sera el socket o canal)
        //podemos poner el nombre que querramos, pero tratemos de ser claros para que se usa el canal o socket.
        this.io.emit('mensajeAll',data);//Emitimos un evento al front-end en un canal que se llama mensajeAll y le enviamos el dato que recibimos donde vienen los mensajes del front-end
      });
    });
  }
}

module.exports = SocketIO;//De esta forma exportamos el modulo para se usado desde otro archivo js.
