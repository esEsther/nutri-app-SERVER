const express = require("express")
const router = express.Router()
const {getAllArticles} = require("../controllers/inicio.controller")


router.get('/', getAllArticles)

module.exports=router;
