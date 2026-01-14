const {getAllArticlesModel, getRecetaPorID, getTodasLasRECETAS} = require('../models/inicio.models')

const getAllArticles = async (req, res) => {
    // console.log('hola desde inicio controllers get all articles')
    try {
        const data = await getAllArticlesModel()
        // console.log ("-.-.--.-. estos son todos los artículos -.- .-.-.", data)
        return res.status(200).json({
            //la solicitud ha tenido éxito
            ok: true,
            msg: "aquí todos los artículos",
            data
        })
    } catch (error) {
        console.log(error, 'este es el error de get all articles')
        return res.status(500).json({
            // es un fallo en el servidor web al procesar una solicitud en el navegador
            ok:false,
            msg: 'Contacta con el adeministrador'
        })
    }
}

const getTodasLasRecetas = async (req, res) => {
    // console.log('hola desde inicio controllers get todas las recetas')
    try {
        const data = await getTodasLasRECETAS()
        // console.log ("-.-.--.-. estos son todos las recetas -.- .-.-.", data)
        return res.status(200).json({
            //la solicitud ha tenido éxito
            ok: true,
            msg: "aquí todas las recetas",
            data
        })
    } catch (error) {
        console.log(error, 'este es el error de get todas las recetas')
        return res.status(500).json({
            // es un fallo en el servidor web al procesar una solicitud en el navegador
            ok:false,
            msg: 'Contacta con el adeministrador'
        })
    }
}

const getRecetaPorId = async (req, res) => {
    const {id} = req.params
    console.log('ID receta recibido en controller:', id)
    try {
        const data = await getRecetaPorID(id)
        return res.status(200).json({
            ok: true,
            msg: "TODO OK",
            data
        })
    } catch (error) {
        console.log(error, 'este es el error de get receta por id')
        return res.status(500).json({
            ok:false,
            msg: 'Contacta con el adeministrador'
        })
    }
}

module.exports={
   getAllArticles,
    getRecetaPorId,
    getTodasLasRecetas
}