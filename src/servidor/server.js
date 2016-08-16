'use strict';//El metodo estricto lo usamos para poder abilitar opciones como las variables let y clases que no estan disponibles
//normalmente

const express = require('express'),//Requerimos el framework express http://expressjs.com/es/
      swig    = require('swig'),//Requerimos el render de templates swig para mostrar y manejar las vistas https://github.com/paularmstrong/swig
      parser  = require('body-parser'),//Requerimos el modulo body-parser para poder recibir los datos de los solicitudes y convertirlo en json
      path    = require('path');

class Server {//Declaramos la clase Server
  constructor(config){//Creamos un metodo constructor que recibira los datos del servidor
    config = config || {};//Si los parametros no estan le decimos que su valor sera un objeto vacio

    this.app = express();//Iniciamos express y lo guardamos en una variable de contexto
    this.app.use(parser.json());//Usamos el middleware body-parser para parsear los datos que recibimos en el body y convertirlos a json
    this.app.use(parser.urlencoded({extended: true}));//Le decimos que los datos pasaran codificados de varias formas
    this.app.use(express.static(path.join(__dirname, '../cliente/js/')));//Creamos un middleware y hacemos uso del modulo path.join() y le decimos que use la ruta del archivo y luego podamos movernos en las rutas
    //De esta forma le decimos que los archivos estaticos como imagenes, css, js, videos y demas assets estaran en esa carpeta
    this.app.engine('html', swig.renderFile);//Le decimos cual sera el motor de renderizacion de templates y sera swig
    this.app.set('view engine', 'html');//Le decimos que use html como formato de las vistas
    this.app.set('views', path.join(__dirname, '../cliente/views'));//Al igual que los estaticos de esta forma le decimos donde se encuentran los archivos html

    if(process.env.dev == "devop"){//De esta forma le decimos que estamos recibiendo una variable de entorno llamada dev y le decimos que su valor es "devop"
      //que las vistas no guarden cache y asi podamos ver los cambios del html sin detener el servidor
      this.app.set('view cache', false);
    }

    this.app.get('/', (sol, res)=>{//De esta forma agregamos las rutas, en esta le decimos que es una ruta get que estara en la raiz
      //y se ejecutara una funcion que recibira la solicitud y la respuesta del servidor
      console.log(sol.body);
      res.render('index');//De esta forma le decimos que nos renderce la vista, le pasamos el nombre del archivo html sin la extencion y nos lo mostrar cuando entremos a localhost:port
    });

  }
}

module.exports = Server;//Exportamos el modulo server que usaremos desde otros archivos js
