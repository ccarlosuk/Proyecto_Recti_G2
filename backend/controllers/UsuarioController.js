/*const cursoModel = require("../models/CursoModel");
const usuarioModel = require("../models/UsuarioModel");
const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");*/

const { request,response } = require('express');
const bcryptjs = require('bcryptjs');

const usuarioModel = require('../models/UsuarioModel');

const usuariosPost = async (req, res = response) => {
  try {
    const {usuario,password} = req.body;

    //const user = await usuarioModel.checkEmailExists(correo);
    const user = await usuarioModel.checkUserExists(usuario);
    console.log(user);
    if (user.length === 0) {
      return res.status(400).json({
        errors: [
          {
            msg: "Correo o contrasenia no encontrado !!",
          },
        ],
      });
    }

    //const checkPassword = user[0].nombre === "Juan";
    const checkPassword = user[0].contrasenia === password;

    if (checkPassword) {
      delete user[0].password;
      return res.status(200).json(user[0]);
    }

    /*if (user[0].status === 0) {
      return res.status(400).json({
        errors: [
          {
            msg: "You Are BLOCKED From The System, Please Contact The Admin ",
          },
        ],
      });
    }*/
    //NOMBRE
    /*const checkPassword =
        user[0].type === "Admin"
            ? password === user[0].password
            : await bcrypt.compare(password, user[0].password);

    if (checkPassword) {
      delete user[0].password;
      return res.status(200).json(user[0]);
    }*/

    res.status(400).json({
      errors: [
        {
          msg: "Email or Password Not Found !",
        },
      ],
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({err: err});
  }

}


/*

  const {correo,password} = req.body;

  //VERIFICAR SI EL CORREO EXISTE
  const existeEmail = await Usuario.checkEmailExists(correo);
  if (existeEmail){
    return res.status(400).json({
      msg: 'Este correo ya está registrado'
    });
  }

  //ENCRIPTAR LA CONTRASEÑA
  const salt = bcryptjs.genSaltSync(10);
  const pass = bcryptjs.hashSync(password,salt);

  //GUARDAR EN BD
  await usuario.save();

  res.json({
    message: 'post API - controlador',
    /!*nombre,
    edad*!/
    usuario
  });
};

*/



/*
const usuarioController = {
  //LISTAR LOS CURSOS MATRICULADOS
  viewActiveCourses: async (req, res) => {
    try {
      const queryResult = await cursoModel.getActiveCourses();
      res.status(200).json(queryResult);
    } catch (err) {
      res.status(404).json(err);
    }
  },

  login: async (req, res) => {
    try {
      const loginData = req.body;

      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
      }

      const user = await usuarioModel.checkEmailExists(loginData.email);

      if (user.length === 0) {
        return res.status(400).json({
          errors: [
            {
              msg: "Correo o contrasenia no encontrado !!",
            },
          ],
        });
      }

      if (user[0].status === 0) {
        return res.status(400).json({
          errors: [
            {
              msg: "You Are BLOCKED From The System, Please Contact The Admin ",
            },
          ],
        });
      }

      const checkPassword =
        user[0].type === "admin"
          ? loginData.password === user[0].password
          : await bcrypt.compare(loginData.password, user[0].password);

      if (checkPassword) {
        delete user[0].password;
        return res.status(200).json(user[0]);
      }

      res.status(400).json({
        errors: [
          {
            msg: "Email or Password Not Found !",
          },
        ],
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({ err: err });
    }
  },
};
*/

//module.exports = usuarioController;
module.exports ={
  usuariosPost
};