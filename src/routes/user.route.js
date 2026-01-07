const express = require("express");
const router = express.Router();
const {validarJWT} = require("../middlewares/validarJWT.js")
const {check} = require("express-validator");
// const{validateInputs}= require("../middlewares/validateIputs.js");
const {validarRol} = require("../middlewares/roles.middleware.js")
const {borrarDeFavoritos, buscarArticulo,getAllArticles,getArticuloPorId, getTodoLosFavoritos,guardarEnFavoritos}=require('../controllers/user.controller.js')



router.get('/dashboard/:id',[validarJWT, validarRol([1])], getArticuloPorId)

router.get('/buscar', [validarJWT, validarRol([1]), check("titulo")
        .not().isEmpty().withMessage("Debes escribir el título")
        .isLength({min:1, max:150}).withMessage("El título no tiene la longitud correcta")
    // validateInputs
], buscarArticulo)

router.post('/anadirFavoritos',[validarJWT, validarRol([1])], guardarEnFavoritos)
router.get('/favoritos', [validarJWT, validarRol([1])], getTodoLosFavoritos)
router.delete('/deleteFavorito/:id',[validarJWT, validarRol([1])], borrarDeFavoritos)


module.exports = router