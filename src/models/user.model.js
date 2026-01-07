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

const getTodosLosFAVORITOS = async(id_usuario) => {
    let client, result;
    try {
        client= await connection()
        result= await client.query(userQuerys.getArticulosFavoritos, [id_usuario])
        return result.rows
    } catch(error) {
        console.log('Este es el error al obtener los favoritos: ', error)
        throw error
    } finally {
        await client.end();
    }
}

const guardarFavorito = async (id_articulo, id_usuario) => {
    // const {id_articulo} = body
    let client, result
    try {
        client= await connection()
        result= await client.query(userQuerys.guardarArticuloFavorito, [id_articulo, id_usuario])
        return result.rows[0]
    } catch(error) {
        console.log('Este es el error al guardar un artículo en favoritos: ', error)
        throw error
    } finally {
        if (client) await client.end();
    }
}

const borrarFavorito = async (body, id_usuario) => {
    const {id_articulo} = body
    let client, result
    try {
        client= await connection()
        result= await client.query(userQuerys.eliminarFavorito, [id_articulo, id_usuario])
        return result.rows
    } catch(error) {
        console.log('Este es el error al guardar un artículo en favoritos: ', error)
        throw error
    } finally {
        if (client) await client.end();
    }
}

const existeEnFavoritos = async (id_articulo, id_usuario) => {
    // const {id_articulo} = body
    let client, result
    try {
        client= await connection()
        result= await client.query(userQuerys.existeEnFavoritos, [id_articulo, id_usuario])
        return result.rows[0]
    } catch(error) {
        console.log('Este es el error al comprobar si exisiste un artículo en favoritos: ', error)
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

module.exports={
    borrarFavorito,
    existeEnFavoritos,
    getArticuloPorID,
    getTodosLosFAVORITOS,
    getArticuloPorTitulo,
    guardarFavorito
}