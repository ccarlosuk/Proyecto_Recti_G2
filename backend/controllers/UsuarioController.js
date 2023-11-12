const { request,response } = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const createAccessToken = require("../lib/jwt");
require('dotenv').config({path: '../.env'})

const usuarioModel = require('../models/UsuarioModel');
const query = require("../database/dbConnection");

const TOKEN_SECRET = process.env.TOKEN_SECRET;

const UsuarioController = {
  register: async (req, res = response) => {
    const {email, password, username} = req.body;
    try{
      //ENCRIPTAR LA CONTRASEÑA
      const salt = bcryptjs.genSaltSync(10);
      const pass = bcryptjs.hashSync(password,salt);
      const newUser = new User ({
        username,
        email,
        password: pass
      });
      //GUARDAR EL NUEVO USUARIO
      const userSaved = await newUser.save();

      jwt.sign({
        id:userSaved._id
      })
    }catch (error) {
      console.log(error);
    }
  },

  login: async (req, res = response) => {
    try {
      const {usuario,password} = req.body;

      //OBTENER EL ARREGLO DE USUARIOS DE ACUERDO AL USUARIO
      const userFound = await usuarioModel.checkUserExists(usuario);

      console.log(userFound[0]);

      if (userFound.length === 0) {
        return res.status(400).json({
          errors: [
            {
              msg: "Usuario no encontrado !!",
            },
          ],
        });
      }
      /*//BLOQUEO DEL SISTEMA
      if (user[0].status === 0) {
        return res.status(400).json({
          errors: [
            {
              msg: "You Are BLOCKED From The System, Please Contact The Admin ",
            },
          ],
        });
      }*/

      //COMPARAR CONTRASEÑA
      const isMatch = await bcrypt.compare(password,userFound[0].contrasenia);
      //const isMatch = true;
      if (!isMatch){
        return res.status(400).json({
          errors: [
            {
              msg: 'La constraseña es incorrecta'
            },
        ],
        });
      }

      //CREAR TOKEN DE ACCESO USANDO LOS DATOS DE LA BD
      const token = await createAccessToken({
        id: userFound[0].id_usuario,
        username: userFound[0].usuario,
      });

      res.cookie("token", token, {
        httpOnly: process.env.NODE_ENV !== "development",
        secure: true,
        sameSite: "none",
        withCredentials: true
      });
      res.json({
        id: userFound[0].id_usuario,
        username: userFound[0].usuario,
        contrasenia: userFound[0].contrasenia,
        rol: userFound[0].nombre_rol ,
        token: token
      });

      /*
      const checkPassword =
          userFound[0].id_rol === 1 //Alumno
              ? password === userFound[0].password //
              : await bcrypt.compare(password,userFound[0].contrasenia);//
      //--------------JWT---------------
      if (checkPassword) {

        //CREAR TOKEN DE ACCESO USANDO LOS DATOS DE LA BD
        const token = await createAccessToken({
          id: userFound[0].id_usuario,
          username: userFound[0].usuario,
        });

        res.cookie("token", token, {
          httpOnly: process.env.NODE_ENV !== "development",
          secure: true,
          sameSite: "none",
        });

        res.json({
          id: userFound[0].id_usuario,
          username: userFound[0].usuario,
          constrasenia: userFound[0].contrasenia,
        });


        delete userFound[0].password;
        return res.status(200).json(userFound[0]);
      }
      */
      /*res.status(400).json({
        errors: [
          {
            msg: "Usuario o contraseña no encontrado !!",
          },
        ],
      });*/
    } catch (err) {
      console.log(err);
      res.status(500).json({msg: err.message});
    }
  },

  /*verificarToken : async (req, res) => {
    const { token } = req.cookies;
    if (!token) return res.send(false);

    jwt.verify(token, TOKEN_SECRET, async (error, user) => {
      if (error) return res.sendStatus(401);

      //const userFound = await User.findById(user.id);
      //OBTENER EL ARREGLO DE USUARIOS DE ACUERDO AL USUARIO (PAYLOAD)
      const userFound = await usuarioModel.checkUserExists(user.id);

      if (user.length === 0) return res.sendStatus(401);

      return res.json({
        id: user[0].id_usuario,
        username: user[0].usuario,
        constrasenia: user[0].contrasenia,
      });
    });
  },*/

  logout: async (req, res) => {
    res.cookie("token", "", {
      httpOnly: true,
      secure: true,
      expires: new Date(0),
    });
    return res.sendStatus(200);
  }
}

module.exports ={
  UsuarioController
};