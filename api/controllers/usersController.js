// Incluimos el fichero con la definición de la BD:
var db = require('../db');
var mongodb = require('mongodb');

// Incluimos la constante "validationResult" para poder utilizar los módulos de validación:
const { validationResult } = require('express-validator');

// Conectamos con la base de datos MongoDB:
db.connect('mongodb://localhost:27017', function (err) {
  if (err) {
      throw ('Fallo en la conexión con la BD');
  }
});

// Mostramos todos los usuarios almacenados en la base de datos:
module.exports.users_list = function (req, res) {
    db.get().db('apidb').collection('users').find().toArray(function (err, result) {
            if (err) {
                throw ('Fallo en la conexión con la BD');
            } else {
                res.send(result);
            }
    });
};
  
// Creamos un nuevo usuario y lo almacenamos en la base de datos:
module.exports.users_create = function (req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    if (db.get() === null) {
        next(new Error('La conexión no está establecida'));
        return;
    }
    const user = {};
    user.Nombre = req.body.Nombre;
    user.Apellidos = req.body.Apellidos;
    user.Edad = req.body.Edad;
    user.Dni = req.body.Dni;
    user.Cumpleanos = req.body.Cumpleanos;
    user.ColorFav = req.body.ColorFav;
    user.Sexo = req.body.Sexo;
    db.get().db('apidb').collection('users').insertOne(user, function (err, result) {
        if (err) {
            throw ('Fallo en la conexión con la BD');
                } else {
                    res.send(result);
        }
    });
};

// Actualizamos un usuario de la base de datos:
module.exports.users_update_one = function (req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    if (db.get() === null) {
        next(new Error('La conexión no está establecida'));
        return;
    }
    const filter = {_id: new mongodb.ObjectID(req.params.id)};
    const update = {
        $set: {
            Nombre: req.body.Nombre,
            Apellidos: req.body.Apellidos,
            Edad: req.body.Edad,
            Dni: req.body.Dni,
            Cumpleanos: req.body.Cumpleanos,
            ColorFav: req.body.ColorFav,
            Sexo: req.body.Sexo
        }
    };
    db.get().db('apidb').collection('users').updateOne(filter, update, function (err, result) {
        // Si se produjo un error, enviamos el error a la siguiente función:
        if (err) {
            next ( new Error('Fallo en la conexión con la BD') );
            return;
        } else {
            // Si todo fue bien, devolvemos el resultado al cliente:
            res.send(result);
        }
    });
};

// Borramos un usuario de la base de datos:
module.exports.users_delete_one = function (req, res, next) {
    if (db.get() === null) {
        next(new Error('La conexión no está establecida'));
        return;
    }
    const filter = {_id: new mongodb.ObjectID(req.params.id)};
    db.get().db('apidb').collection('users').deleteOne(filter, function (err, result) {
        // Si se produjo un error, enviamos el error a la siguiente función:
        if (err) {
            next ( new Error('Fallo en la conexión con la BD') );
            return;
        } else {
            // Si todo fue bien, devolvemos el resultado al cliente:
            res.send(result);
        }
    });
};