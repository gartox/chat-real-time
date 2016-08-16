import io from 'socket.io-client';
import randomcolor from 'randomcolor';

const socket = io('http://localhost:3000');

let usuario = localStorage.getItem('usuario') || prompt('Introduce tu nombre de usuario!');
let color = localStorage.getItem('color') || randomcolor();

localStorage.setItem('usuario', usuario);
localStorage.setItem('color', color);

function mensaje(e){
  let mensaje = document.getElementById('mensaje');
  socket.emit('mensaje', {mensaje:mensaje.value, usuario:localStorage.getItem('usuario'), color: localStorage.getItem('color')});
  mensaje.value = '';
}

socket.on('mensajeAll',(data)=>{
  let mensajes = document.getElementById('chat');
  mensajes.innerHTML = mensajes.innerHTML == '' ? `<li>${data.mensaje}<li>`: `${mensajes.innerHTML} <li><b style="color:${data.color}">${data.usuario}</b>: ${data.mensaje}</li>`;
});

document.getElementById('enviar').addEventListener('click', mensaje);
