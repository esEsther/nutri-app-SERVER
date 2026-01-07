const {anadirARTICULO, editarARTICULO, eliminarARTICULO, findOne, getAllArticlesModel, getArticuloPorID} = require("../models/admin.model")
const {saveImage} = require('../middlewares/upload')

const getAllArticles = async (req, res) => {
    // console.log('hola desde inicio controllers get all articles')
    try {
        const data = await getAllArticlesModel()
        console.log ("-.-.--.-. estos son todos los artículos -.- .-.-.", data)
        return res.status(200).json({
            //la solicitud ha tenido éxito
            ok: true,
            msg: data.length > 0
            ? "Aquí están todos los artículos"
            : "No hay artículos disponibles",
            data
        })
    } catch (error) {
        console.log(error, 'este es el error de get all articles')
        return res.status(500).json({
            // es un fallo en el servidor web al procesar una solicitud en el navegador
            ok:false,
            msg: 'Contacta con el administrador'
        })
    }
}


const anadirArticulo = async (req, res) => {
    const body = req.body
    try {
        const existe = await findOne(body.titulo);
        console.log(existe, "existe desde admin controllers")
        if(existe){
            return res.status(401).json({
                ok:false,
                msg: "Ya hay un artículo con este título"
            })
        }
        if (req.file) {
            const imagePath = saveImage(req.file); //guardamos la imagen
            console.log("Imagen guardada desde el controlador")
            req.body.imagen_url = imagePath;
        }
        const data = await anadirARTICULO(body)
        console.log("Se ha añadido este artículo:", data);
        return res.status(201).json({
            ok: true,
            msg: "Artículo añadido correctamente",
            data
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false,
            msg: "Ha habido un problema, contacta con su administrador"
        })
    }
}

// const editarArticulo = async (req, res) => {
//     const id = req.params.id
//     const modificar = req.body
//     try {
//         if (req.file) {
//             const imagePath = saveImage(req.file);
//             console.log("Imagen guardada desde admin controllers editar")
//             req.body.imagen_url = imagePath;
//         }
//         const nuevoArticulo = await editarARTICULO(id, modificar)
//         if (nuevoArticulo) {
//             return res.status(200).json({
//                 ok: true,
//                 msg: "Artículo actualizado",
//                 nuevoArticulo
//             })
//         } else {
//             return res.status(404).json({
//                 ok: false,
//                 msg: "ERROR 404, artículo no encontrado",
//             })
//         }
//     } catch (error) {
//         console.log(error)
//         return res.status(500).json({
//             ok: false,
//             msg: 'Error, contacte con el administrador',
//         })
//     }
// }
const editarArticulo = async (req, res) => {
  const { id } = req.params;

  try {
    
    if (req.file) {
      const imagePath = saveImage(req.file);
      req.body.imagen_url = imagePath;
    }

    //ACTUALIZAMOS ARTÍCULO
    const actualizado = await editarARTICULO(id, req.body);

    if (!actualizado) {
      return res.status(404).json({
        ok: false,
        msg: "Artículo no encontrado"
      });
    }

    return res.status(200).json({
      ok: true,
      msg: "Artículo actualizado correctamente"
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      ok: false,
      msg: "Error del servidor"
    });
  }
};


const borrarArticulo = async (req, res) => {
    const id = req.params.id
    try {
        const articuloBorrado = await eliminarARTICULO(id)
        if (articuloBorrado) {
            return res.status(200).json({
                ok: true,
                msg: "Se ha borrado el artículo",
                articuloBorrado
            })
        } else {
            return res.status(404).json({
                ok: false,
                msg: "ERROR 404, artículo no encontrado",
            })
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false,
            msg: 'Error, contacte con el administrador',
        })
    }
}

const getArticuloPorId = async (req, res) => {
    console.log('hola desde get articulo por id en admin controller')
  try {
    const { id } = req.params

    const articulo = await getArticuloPorID(id)
    console.log(`Este es el artículo con id ${id}`, articulo)

    if (!articulo) {
      return res.status(404).json({ msg: "Artículo no encontrado" })
    }

    res.json({
      id: articulo.id,
      titulo: articulo.titulo,
      contenido: articulo.contenido,
      imagen: articulo.imagen
    })
  } catch (error) {
    res.status(500).json({ msg: "Error del servidor" })
  }
}

module.exports={
   getAllArticles,
   anadirArticulo,
   editarArticulo,
   borrarArticulo,
   getArticuloPorId
}