// const { body } = require('express-validator')
const { connection} = require ('../config/dbConnect')
const {userQuerys} = require('./user.querys')

const getArticuloPorTitulo = async (body) => {
    const {titulo} = body
    let client, result
    try {
        client = await connection()
        result = await client.query(userQuerys.getArticuloPorTitulo,[titulo])
        return result.rows //devuelve un array de de objetos con las filas de la tabla de la consulta
    } catch(error) {
        console.log('Este es el error al intentar buscar un artículo por título: ', error)
        throw error
    } finally {
        if (client) await client.end();
    }
}

const getTodosLosFAVORITOS = async(id_usuario, tipo) => {
    let client, result;
    try {
        client= await connection()
        console.log('Tipo en el modelo:', tipo)
        if(tipo==='articulo') result= await client.query(userQuerys.getArticulosFavoritos, [id_usuario])
        if(tipo==='receta') result= await client.query(userQuerys.getRecetasFavoritos, [id_usuario])
        return result.rows
    } catch(error) {
        console.log('Este es el error al obtener los favoritos: ', error)
        throw error
    } finally {
        await client.end();
    }
}

const guardarFavorito = async (id_articulo, id_receta, id_usuario) => {
    
    let client, result
    try {
        client= await connection()
        if(id_articulo) result= await client.query(userQuerys.guardarArticuloFavorito, [id_articulo, id_usuario])
        if(id_receta) {
            result= await client.query(userQuerys.guardarRecetaFavorito, [id_receta, id_usuario])
        } 
        return result.rows[0]
    } catch(error) {
        console.log('Este es el error al guardar un artículo en favoritos: ', error)
        throw error
    } finally {
        if (client) await client.end();
    }
}

const borrarFavorito = async (id_articulo, id_receta, id_usuario) => {
    // const {id_articulo, id_receta} =body
    // console.log('hola desde el modelo eliminar', id_articulo, id_receta, id_usuario)
    let client, result
    try {
        client= await connection()
        if(id_articulo) result= await client.query(userQuerys.eliminarArticuloFavorito, [id_usuario, id_articulo])
        if(id_receta) result= await client.query(userQuerys.eliminarRecetaFavorito, [id_usuario, id_receta])
        return result.rows
    } catch(error) {
        console.log('Este es el error al guardar en favoritos: ', error)
        throw error
    } finally {
        if (client) await client.end();
    }
}

const existeEnFavoritos = async (id_articulo, id_receta, id_usuario) => {
    // const {id_articulo} = body
    let client, result
    try {
        client= await connection()
        if(id_articulo) result= await client.query(userQuerys.existeArticuloFavoritos, [id_articulo, id_usuario])
        if(id_receta) result= await client.query(userQuerys.existeRecetaFavoritos, [id_receta, id_usuario])
        return result.rows[0]
    } catch(error) {
        console.log('Este es el error al comprobar si exisiste un elemento en favoritos: ', error)
        throw error
    } finally {
        if (client) await client.end();
    }
}

const getArticuloPorID = async (id) => {
    let client, result
    try {
        client= await connection()
        result= await client.query(userQuerys.getArticuloPorId, [id])
        return result.rows
    } catch(error) {
        console.log('Este es el error al buscar un artículo por id: ', error)
        throw error
    } finally {
        if (client) await client.end();
    }
}

const findOne = async (id) => {
  let client, result
  try {
    client = await connection();
    result = await client.query(userQuerys.findOne, [id])
    return result.rows[0] || null;
  } catch (error) {
    console.log(error, "erron en el modelo existe")
    return error;
  } finally{
    await client.end()
  }
}

const anadirRECETA = async ({id_receta, titulo, contenido, imagen_url }) => {
  let client, result
  try {
    client = await connection();
    result = await client.query(userQuerys.anadirRECETA, [titulo, imagen_url, contenido, id_receta])
    return result.rows;
  } catch (error) {
    console.log(error, "error al añadir receta en el modelo")
    return error;
  } finally{
    await client.end()
    // console.log("<==============FINAL=============>")
  }
}

module.exports={
    borrarFavorito,
    existeEnFavoritos,
    getArticuloPorID,
    getTodosLosFAVORITOS,
    getArticuloPorTitulo,
    guardarFavorito,
    findOne,
    anadirRECETA
}