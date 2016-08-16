//Este es un archivo js del front-end y en este estamos usando ecmascript6 con babel
import io from 'socket.io-client';//importamos los modulos que vamos a usar, en este traemos el modulo de sockt.io para el cliente
import randomcolor from 'randomcolor';

const socket = io('http://localhost:3000');//En una constante declaramos la conexion al servidor con socket.io

let usuario = localStorage.getItem('usuario') || prompt('Introduce tu nombre de usuario!');//Le decimos que la variable tendra un valor guardado en un localstorage si no existe valor que nos envie un popup y nos pida agregemos un valor
let color = localStorage.getItem('color') || randomcolor();//Usamos el modulo randomcolor para generar un color en hexadecimal si existe valor lo agregamos a la variable color y si no el modulo lo va a generar

localStorage.setItem('usuario', usuario);//Seteamos el valor al localstorage usuario y le decimos que su valor sera el de la variable usuario
localStorage.setItem('color', color);//Hacemos lo mismo que con el localstorage usuario

function mensaje(e){//Creamos una funcion que se ejecutara cuado le demos click a enviar
  let mensaje = document.getElementById('mensaje');//Obetenemos el contexto del input mensaje
  socket.emit('mensaje', {mensaje:mensaje.value, usuario:localStorage.getItem('usuario'), color: localStorage.getItem('color')});//Emitimos el valor del input, el nombre de usuario y el color al canal o socket llamado mensaje
  mensaje.value = '';//Limpiamos el input
}

socket.on('mensajeAll',(data)=>{//Escuchamos el al canal mensajeAll y recibimos los datos que nos envia el servidor
  let mensajes = document.getElementById('chat');//Obtenemos el contexto del contenedor donde mostraremos los mensaje
  mensajes.innerHTML = mensajes.innerHTML == '' ? `<li>${data.mensaje}<li>`: `${mensajes.innerHTML} <li><b style="color:${data.color}">${data.usuario}</b>: ${data.mensaje}</li>`;
  //Agregamos al html del contenedor los valores de le mesnaje en una lista y la filtramos con un operador ternario
});

document.getElementById('enviar').addEventListener('click', mensaje);//Con este ke decimos que escuche un evento en el boton enviar y cuando el evento  click se ejecute, ejecute la funcion mensaje.
