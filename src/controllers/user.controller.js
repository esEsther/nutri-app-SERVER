const {borrarFavorito, existeEnFavoritos, getArticuloPorID,getArticuloPorTitulo, getTodosLosFAVORITOS, guardarFavorito} = require('../models/user.model')
const {getAllArticlesModel} = require('../models/inicio.models')

const getAllArticles = async (req, res) => {
    // console.log('hola desde inicio controllers get all articles')
    try {
        const data = await getAllArticlesModel()
        console.log ("-.-.--.-. estos son todos los artículos -.- .-.-.", data)
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

const buscarArticulo = async (req, res) => {
    const {titulo} = req.query

    //req.query es un objeto que contiene los parámentros de la url después del ?
    //Ejemplo: GET /articulos?titulo=nutricion
    // req.query = {
    //     titulo: "nutricion",
    // }

    if(!titulo) {
        // Error 400 es que hubo algún tipo de problema en la comunicación de tu navegador al servidor, es decir, que no se puedo realizar la acción solicitada.
        return res.status(400).json({
            ok: false,
            msg: "Por favor, escribe un título"
        })
    }

    try {
        const data = await getArticuloPorTitulo({titulo})

        if (data.lenght === 0) {
            // Un error 404 indica que la página web a la que intentaba acceder no se pudo encontrar en el servidor.
            return res.status(404).json({
                ok: false,
                msg: "No tenemos ningún artículo con ese título"
            })
        }

        // Un estado 200 indica que la solicitud ha tenido éxito
        return res.status(200).json({
            ok: true,
            msg: 'Todo bien',
            data
        })

    } catch (error) {
        console.log('Error al buscar el artículo: ', error)
        // el estado 500 indica que algo ha salido mal con el servidor
        return res.status(500).json({
            ok: false,
            msg: 'Ha habido un problema con la búsqueda, contacte con el administrador'
        })

        
    }
}

const getTodoLosFavoritos = async (req, res) => {
    try {
        const id_usuario = req.userToken.uid;
        const data = await getTodosLosFAVORITOS(id_usuario)
        console.log("Estos son los artículos favoritos del usario:", data)
        return res.status(200).json({ //resp satisfactoria
            ok: true,
            msg: "TODO OK",
            data
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false,
            msg: "ERROR EN LA BUSQUEDA DE FAVORITOS, contacte con el administrador"
        })
    }
}

const guardarEnFavoritos = async (req,res) => {

    const body = req.body
    try {
        const { id_articulo } = req.body;
        const id_usuario = req.userToken.uid;

        if (!id_articulo) {
        return res.status(400).json({
            ok: false,
            msg: "Se requiere el ID del artículo"
        });
        }

        const existeFavorito = await existeEnFavoritos(id_articulo, id_usuario)
        if(existeFavorito){
            return res.status(400).json({
                ok: false,
                msg: "Ya existe este artículo en favoritos",
            })
        }
        const data = await guardarFavorito(id_articulo, id_usuario)
        console.log("El artículo se ha guardado en favoritos", data)
        // El estado 201 significa que una solicitud se realizó correctamente y se creó un nuevo recurso.
        return res.status(201).json({
            ok: true,
            msg: "Articulo guardado en Favoritos",
            data
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false,
            msg: "Error al guaradar en favoritos, contacte con el administrador"
        })


    
  }
};

const borrarDeFavoritos = async (req,res) => {

    console.log(req.params)
    try {
        const { id } = req.params;
        const id_usuario = req.userToken.uid;

        if (!id) {
        return res.status(400).json({
            ok: false,
            msg: "Se requiere el ID del artículo"
        });
        }

        const existeFavorito = await existeEnFavoritos(id, id_usuario)
        if(!existeFavorito){
            return res.status(400).json({
                ok: false,
                msg: "No existe en favoritos, por lo que no se puede borrar",
            })
        }
        const data = await borrarFavorito(id, id_usuario)
        console.log("El artículo se ha borrado de favoritos", data)
        // El estado 201 significa que una solicitud se realizó correctamente y se creó un nuevo recurso.
        return res.status(201).json({
            ok: true,
            msg: "TODO OK",
            data
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false,
            msg: "Error al eliminar de favoritos, contacte con el administrador"
        })
    }
}

const getArticuloPorId = async (req, res) => {
     const id = req.params.id
    try {
        const data = await getArticuloPorID(id)
        return res.status(200).json({
            ok: true,
            msg: "TODO OK",
            data
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false,
            msg: "error, contacta con el administrador"
        })
    }
}

module.exports={
    borrarDeFavoritos,
    getAllArticles,
    buscarArticulo,
    getTodoLosFavoritos,
    guardarEnFavoritos,
    getAllArticles,
    getArticuloPorId
}