const express = require("express")
const router = express.Router()
const {check} = require("express-validator");

const {createUser, loginUser, renewToken} = require("../controllers/auth.controller")
const {validarJWT} = require("../middlewares/validarJWT")
// const{validateInputs}= require("../middlewares/validateInputs");
const {validarRol} = require("../middlewares/roles.middleware")

// REGISTER
router.post('/signup', [
    check("nombre")
        .not().isEmpty().withMessage("Debes escribir el título")
        .isLength({min:1, max:50}).withMessage("El nombre no tiene la longitud correcta"),
    check("email")
        .not().isEmpty().withMessage("Debes escribir el email")
        .isEmail().withMessage("Debes escribir un email correcto")
        .isLength({min:1, max:100}).withMessage("No tiene la logitud correcta"),
    check("contrasenia")
        .not().isEmpty().withMessage("Debes escribir la contraseña")
        .isLength({min:1, max:250}).withMessage("La contraseña no tiene la longitud correcta")
    // validateInputs
], createUser)  

//LOGIN
router.post('/login',loginUser)
    // [
    // check("email")
    //     .not().isEmpty().withMessage("Debes escribir el email")
    //     .isEmail().withMessage("Debes escribir un email correcto")
    //     .isLength({min:1, max:100}).withMessage("No tiene la logitud correcta"),
    // check("contrasenia")
    //     .not().isEmpty().withMessage("Debes escribir el título")
    //     .isLength({min:1, max:250}).withMessage("La contraseña no tiene la longitud correcta"),
    // validateInputs], 

//RENEWTOKEN
router.post('/renew', renewToken)
// , [validarJWT] 

//LOG OUT

// router.post('/logout', [validarJWT], logOut)



module.exports=router;