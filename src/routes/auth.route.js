const express = require("express")
const router = express.Router()
const {check} = require("express-validator");

const {createUser, loginUser, renewToken} = require("../controllers/auth.controller")
const {validarJWT} = require("../middlewares/validarJWT")
// const{validateInputs}= require("../middlewares/validateInputs");
const {validarRol} = require("../middlewares/roles.middleware")

// REGISTER
router.post('/signup', [
     // Nombre
  check("nombre")
    .notEmpty().withMessage("Debes escribir el nombre")
    .isLength({ min: 2, max: 50 })
    .withMessage("El nombre debe tener entre 2 y 50 caracteres")
    .trim(),
  // Email
  check("email")
    .notEmpty().withMessage("Debes escribir el email")
    .isEmail().withMessage("El email no tiene un formato válido")
    .isLength({min: 5,  max: 100 })
    .withMessage("El email no puede superar los 100 caracteres"),
  // Contraseña
  check("contrasenia")
    .notEmpty().withMessage("Debes escribir la contraseña")
    .isLength({ min: 1, max: 250 }).withMessage("La contraseña no tiene la longitud correcta")   
    // validateInputs
], createUser)  

//LOGIN
router.post('/login', [
     // Email
  check("email")
    .notEmpty().withMessage("Debes escribir el email")
    .isEmail().withMessage("El email no tiene un formato válido")
    .isLength({min: 5,  max: 100 })
    .withMessage("El email no puede superar los 100 caracteres"),
  // Contraseña
  check("contrasenia")
    .notEmpty().withMessage("Debes escribir la contraseña")
    .isLength({ min: 1, max: 250 }).withMessage("La contraseña no tiene la longitud correcta")   
    // validateInputs
], loginUser)

//RENEWTOKEN
router.post('/renew', [validarJWT] , renewToken)


//LOG OUT

// router.post('/logout', [validarJWT], logOut)



module.exports=router;