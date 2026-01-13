const {anadirARTICULO, editarARTICULO, eliminarARTICULO, findOne, getAllArticlesModel, getArticuloPorID,
       getTodosLosUSUARIOS, buscarUnUSUARIO,editarUSUARIO, getUsuarioPorID, eliminarUSUARIO} = require("../models/admin.model")
const bcrypt = require("bcryptjs");
const {anadir_usuario, findOneUser} = require("../models/auth.model")
const {JWTGenerator} = require("../helpers/jwt")
const {saveImage} = require('../middlewares/upload')


//----------------------------ARTICULOS-----------------------------------------


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



const borrarArticulo = async (req, res) => {
  console.log('hola desde eliminar articulo controller')
    const id = parseInt(req.params.id)
    console.log(id)
    try {
        const articuloBorrado = await eliminarARTICULO(id)
        console.log({articuloBorrado})
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
    console.log(id, 'id del artículo que quiero buscar')

    const articulo = await getArticuloPorID(id)
    console.log(`Este es el artículo con id ${id}`, articulo)

    if (!articulo) {
      return res.status(404).json({ msg: "Artículo no encontrado" })
    }

    res.json({
      id: articulo.id_articulo,
      titulo: articulo.titulo,
      contenido: articulo.contenido,
      imagen: articulo.imagen_url
    })
  } catch (error) {
    res.status(500).json({ msg: "Error del servidor" })
  }
}

const getAllArticles = async (req, res) => {
    // console.log('hola desde inicio controllers get all articles')
    try {
        const data = await getAllArticlesModel()
        // console.log ("-.-.--.-. estos son todos los artículos -.- .-.-.", data)
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
      msg: "Artículo actualizado correctamente",
      data: actualizado
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      ok: false,
      msg: "Error del servidor"
    });
  }
};

//---------------------------USUARIOS-------------------------------------------------------
const getTodosLosUsuarios = async (req, res) => {
  try {
    const data = await getTodosLosUSUARIOS()
    return res.status(200).json({
      ok: true,
            msg: data.length > 0
            ? "Aquí están todos los usuarios"
            : "No hay usuarios disponibles",
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

const buscarUnUsuario = async (req, res) => {
    const {usuario} = req.query
    //req.query es un objeto que contiene los parámentros de la url después del ?
    //Ejemplo: GET /articulos?titulo=nutricion
    // req.query = {
    //     titulo: "nutricion",
    // }

    if(!usuario) {
        // Error 400 es que hubo algún tipo de problema en la comunicación de tu navegador al servidor, es decir, que no se puedo realizar la acción solicitada.
        return res.status(400).json({
            ok: false,
            msg: "Para poder buscar un usuario tienes que escribir algo"
        })
    }

    try {
        const data = await buscarUnUSUARIO(usuario)

        if (data.lenght === 0) {
            // Un error 404 indica que la página web a la que intentaba acceder no se pudo encontrar en el servidor.
            return res.status(404).json({
                ok: false,
                msg: "No tenemos ningún usuario para esa búsqueda"
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

const editarUsuario = async (req, res) => {
  console.log('Hola desde el controlador')
  const { id } = req.params;

  try {
    const actualizado = await editarUSUARIO(id, req.body);

    if (!actualizado) {
      return res.status(404).json({
        ok: false,
        msg: "Usuario no encontrado"
      });
    }

    return res.status(200).json({
      ok: true,
      msg: "Usuario actualizado correctamente",
      data: actualizado 
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      ok: false,
      msg: "Error del servidor"
    });
  }
};

const getUsuarioPorId = async (req, res) => {
    console.log('hola desde get usuario por id en admin controller')
  try {
    const { id } = req.params
    console.log(id, 'id del usuario que quiero buscar')

    const usuario = await getUsuarioPorID(id)
    console.log(`Este es el usuario con id ${id}`, usuario)

    if (!usuario) {
      return res.status(404).json({ok: false,  msg: "usuario no encontrado" })
    }

    // return res.status(200).json({
    //   id: usuario.id_usuario,
    //   nombre: usuario.nombre,
    //   email: usuario.email,
    //   id_rol: usuario.id_rol,
    // })

    return res.status(200).json({
      ok: true,
      msg: "Artículo actualizado correctamente",
     usuario
    })
  } catch (error) {
    res.status(500).json({ok: 'false',  msg: "Error del servidor, contacte con el administrador" })
  }
}

const eliminarUsuario = async (req, res) => {
    const id = req.params.id
    try {
        const usuarioBorrado = await eliminarUSUARIO(id)
        if (usuarioBorrado) {
            return res.status(200).json({
                ok: true,
                msg: "Se ha borrado el usuario",
                usuarioBorrado
            })
        } else {
            return res.status(404).json({
                ok: false,
                msg: "ERROR 404, usuario no encontrado",
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


const crearUsuario = async (req, res) => {
    // console.log('Hola desde create user')
    try {
        
        // console.log(req.body, 'req.body desde create user')
        const { nombre, email, contrasenia, id_rol} = req.body;
        console.log(nombre, email, contrasenia, id_rol)

        if (!nombre || !email || !contrasenia || !id_rol) {
          console.log('algo no va bien')
            return res.status(400).json({ ok: false, msg: "Faltan campos obligatorios" });
        }

        const existe = await findOneUser(email);
        console.log({existe})
        if (existe) {
            return res.status(409).json({ ok: false, msg: "Usuario existente" });
        }

        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(contrasenia, salt);

        
        const savedUser = await anadir_usuario(nombre, email, hashedPassword, id_rol);

        const payload = { uid: savedUser.id_usuario, rol: savedUser.id_rol };
        const token = await JWTGenerator(payload);
        console.log(token, ' este es el token desde auth controller')

        return res.status(200).json({
            ok: true,
            msg: "Usuario registrado correctamente",
            token
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ ok: false, msg: "Contacte con el administrador" });
    }
};

module.exports={
   getAllArticles,
   anadirArticulo,
   editarArticulo,
   borrarArticulo,
   getArticuloPorId,
   getTodosLosUsuarios,
   buscarUnUsuario,
   editarUsuario,
   getUsuarioPorId,
   eliminarUsuario,
   crearUsuario

}