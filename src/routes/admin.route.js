const express = require("express")
const router = express.Router()
const {anadirArticulo, borrarArticulo, editarArticulo, getAllArticles, getArticuloPorId, 
    getTodosLosUsuarios, buscarUnUsuario, editarUsuario, getUsuarioPorId, eliminarUsuario, crearUsuario} = require("../controllers/admin.controller")
const {validarJWT} = require("../middlewares/validarJWT")
const {check} = require("express-validator");
// const{validateInputs}= require("../middlewares/validateIputs");
const {validarRol} = require("../middlewares/roles.middleware")

const {upload} = require("../middlewares/upload");

////////////-----------------RUTAS ARTICULOS-------------------


// router.get('/dashboard',[validarJWT, validarRol([2])], getAllArticles)
// router.get('/dashboard/:id',[validarJWT, validarRol([2])], getArticuloPorID)


router.post('/crearArticulo', [
       
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
    // validateInputs,
], anadirArticulo)

router.get('/articulo/:id', [validarJWT, validarRol([2])], getArticuloPorId )

router.delete('/eliminarArticulo/:id', [validarJWT, validarRol([2])], borrarArticulo)

router.put('/editarArticulo/:id',[   
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

//------------------------RUTAS USUARIOS------------------------------------
router.get('/getTodosLosUsuarios',[validarJWT, validarRol([2])], getTodosLosUsuarios)

router.get('/buscarUsuario/:usuario',[validarJWT, validarRol([2])], buscarUnUsuario)

router.put('/editarUsuario/:id', [
    validarJWT,
    validarRol([2]),
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
    .isLength({min: 5, max: 100 })
    .withMessage("El email no puede superar los 100 caracteres"),

  // Rol
  check("id_rol")
    .notEmpty().withMessage("Debes indicar el rol")
    .isInt({ min: 1 })
    .withMessage("El rol debe ser un número entero válido"),
], editarUsuario)

router.get('/usuario/:id', [validarJWT, validarRol([2])], getUsuarioPorId )

router.delete('/eliminarUsuario/:id', [validarJWT, validarRol([2])], eliminarUsuario)

router.post('/crearUsuario', [
    validarJWT,
    validarRol([2]),
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
    .isLength({min: 5, max: 100 })
    .withMessage("El email no puede superar los 100 caracteres"),

  // Rol
  check("id_rol")
    .notEmpty().withMessage("Debes indicar el rol")
    .isInt({ min: 1 })
    .withMessage("El rol debe ser un número entero válido"),

    // Contraseña
  check("contrasenia")
    .notEmpty().withMessage("Debes escribir la contraseña")
    .isLength({ min: 1, max: 250 }).withMessage("La contraseña no tiene la longitud correcta")   
    // validateInputs
], crearUsuario)



module.exports = router;