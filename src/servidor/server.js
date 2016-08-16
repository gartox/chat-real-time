'use strict';

const express = require('express'),
      swig    = require('swig'),
      parser  = require('body-parser'),
      path    = require('path');

class Server {
  constructor(config){
    config = config || {};

    this.app = express();
    this.app.use(parser.json());
    this.app.use(parser.urlencoded({extended: true}));
    this.app.use(express.static(path.join(__dirname, '../cliente/js/')));
    this.app.engine('html', swig.renderFile);
    this.app.set('view engine', 'html');
    this.app.set('views', path.join(__dirname, '../cliente/views'));

    if(process.env.dev == "devop"){
      this.app.set('view cache', false);
    }

    this.app.get('/', (sol, res)=>{
      res.render('index');
    });

  }
}

module.exports = Server;
