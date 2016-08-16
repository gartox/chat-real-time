'use strict'; //El metodo estricto lo usamos para poder abilitar opciones como las variables let y clases que no estan disponibles
//normalmente

const http    = require('http'),//Declaramos constantes para obtener los modulos que usaremos
      Express = require('./src/servidor/server'),//Estos modulos son creados por nosotros, un modulo creado por nosotros los tenemos que llamar con rutas relativas que siempre comenzaran con ./
      IO      = require('./src/servidor/socket');

let servidor = new Express(); //Instanciamos el modulo Express que contiene la clase del versidor creado en express

let server = http.createServer(servidor.app);//Iniciamos el servidor con el modulo nativo(No tenemos que decargarlo pues ya esta instalado en nodejs) y le pasamos como parametro una opcion que ejecutamos en la clase express

server.listen(3000, ()=> console.log("El servidor se esta ejecutando en el puerto 3000"));//Escuchamos el servidor en el puerto 3000 nosotros podemos poner el puerto que nos guste
//Agregamos una function arrow que enviara por consola un mensaje donde nos dice la informacion que querramos pasarle.

let socket = new IO({server:server});//Instanciamos la clase socket que hace referencia a un servidor de socket.io al que le pasamos el contexto del servidor para poder hacer uso del mismo puerto
//Le pasamos por un objeto el valor del servidor
socket.canales();//Ejecutamos el metodo canales que nos permite abrir los canales en los que esucharemos el flujo de datos en socket.io

