const express = require("express")
const router = express.Router()
const {anadirArticulo, borrarArticulo, editarArticulo, getAllArticles, getArticuloPorId} = require("../controllers/admin.controller")
const {validarJWT} = require("../middlewares/validarJWT")
const {check} = require("express-validator");
// const{validateInputs}= require("../middlewares/validateIputs");
const {validarRol} = require("../middlewares/roles.middleware")

const {upload} = require("../middlewares/upload");




// Ruta inicio (donde están todas las peliculas del admin)
router.get('/dashboard',[validarJWT, validarRol([2])], getAllArticles)
// router.get('/dashboard/:id',[validarJWT, validarRol([2])], getArticuloPorID)

// Ruta crear pelicula
router.post('/crearArticulo', [
       upload.single("imagen"),
       validarJWT, 
       validarRol([2]),
    // Título
    check("titulo")
        .notEmpty().withMessage("Debes escribir el título")
        .isLength({ min: 1, max: 150 }).withMessage("El título no tiene la longitud correcta"),
    // Contenido
    check("contenido")
        .notEmpty().withMessage("Debes escribir la el contenido del artículo")
        .isLength({ max: 15000 }).withMessage("El contenido tiene una longitud máxima de 15000 carácteres"),
    // validateInputs,
], anadirArticulo)

//Ruta editar película
router.post('/editarArticulo/:id',[   
    validarJWT,
    validarRol([2]),
    upload.single("imagen"),
    
    // Título
    check("titulo")
        .notEmpty().withMessage("Debes escribir el título")
        .isLength({ min: 1, max: 150 }).withMessage("El título no tiene la longitud correcta"),
    // Contenido
    check("contenido")
        .notEmpty().withMessage("Debes escribir la el contenido del artículo")
        .isLength({ max: 15000 }).withMessage("El contenido tiene una longitud máxima de 15000 carácteres"),
    // validateInputs
], editarArticulo)


router.get(
  '/articulo/:id',
  [validarJWT, validarRol([2])],
  getArticuloPorId
)

//Ruta borrar película
router.delete('/eliminarArticulo/:id', [validarJWT, validarRol([2])], borrarArticulo)

module.exports = router;