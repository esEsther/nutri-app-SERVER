const express = require("express")
const router = express.Router()
const {getAllArticles, getRecetaPorId, getTodasLasRecetas} = require("../controllers/inicio.controller")


router.get('/', getAllArticles)
router.get('/receta/:id', getRecetaPorId)
router.get('/recetas', getTodasLasRecetas)

module.exports=router;
