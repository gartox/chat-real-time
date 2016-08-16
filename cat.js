'use strict';//El metodo estricto lo usamos para poder abilitar opciones como las variables let y clases que no estan disponibles
//normalmente

const cat = require('catlistener');//Requerimos el modulo catlistener que es un automatizador de tareas

//Levantamos el servidor con la opcion server
cat.server({
  enviroment:{
    dev: 'devop'//le pasamos las variables de entorno
  },
  node: 'supervisor',//Le decimos con que va a levantar nuestro servidor, en este caso con un modulo llamado supervisor que sirve para esuchar los cambios de los archivos del servidor
  debug: '-debug',//Le decimos que le haga debug al servidor
  app: 'app'//Le decimos el nombre del archivo que sera nuestro servidor no es necesario que lleve la extencion pues nodejs ya reconoce que archivo es.
});

//Con la opcion browserify compilamos el codigo js y lo convertimos a ecmascript6
cat.browserify({
  original: './src/cliente/js/script.js',//Le pasamos la ubicacion del archivo original
  compilado: './src/cliente/js/chat.js',//Le decimos donde nos dejara el archivo ya compilado
  presets: true//Le decimos que estaran activos los presets de babel para ecmascript6
});
