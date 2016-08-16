'use strict';

const cat = require('catlistener');

cat.server({
  enviroment:{
    dev: 'devop'
  },
  node: 'supervisor',
  debug: '-debug',
  app: 'app'
});

cat.browserify({
  original: './src/cliente/js/script.js',
  compilado: './src/cliente/js/chat.js',
  presets: true
});
