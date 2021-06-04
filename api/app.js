//Importación de dependencias
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

//se definen las rutas de la aplicación
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

//Creación de la aplicacion
var app = express();

//Se configura el módulo para generar un log de las peticiones que recibe el servidor y verlas por la consola
app.use(logger('dev'));
//Se configura un middleware para que traduzca todas las peticiones de tipo JSON para facilitar su tratamiento.
app.use(express.json());
//middleware para decodificar el contenido de los parámetros que vengan codificados en las peticiones
app.use(express.urlencoded({ extended: false }));
//módulo para facilitar el tratamiento de cookies
app.use(cookieParser());
//módulo para facilitar el tratamiento de los recursos estáticos
app.use(express.static(path.join(__dirname, 'public')));

//se definen las rutas de la aplicación
app.use('/', indexRouter);
app.use('/users', usersRouter);

//se exporta la aplicación para que pueda ser utilizada desde otros ficheros que incluyan app.js
module.exports = app;
