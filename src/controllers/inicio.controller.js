const {getAllArticlesModel} = require('../models/inicio.models')

const getAllArticles = async (req, res) => {
    // console.log('hola desde inicio controllers get all articles')
    try {
        const data = await getAllArticlesModel()
        // console.log ("-.-.--.-. estos son todos los artículos -.- .-.-.", data)
        return res.status(200).json({
            //la solicitud ha tenido éxito
            ok: true,
            msg: "aquí todas los artículos",
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


module.exports={
   getAllArticles
}