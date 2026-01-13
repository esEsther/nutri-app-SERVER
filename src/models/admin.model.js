const {connection} = require('../config/dbConnect')
const {adminQuerys} = require("./admin.querys");
const { inicioQuerys } = require('./inicio.querys');

// -----------------------ARTICULOS---------------------------------------------------

const getArticuloPorID = async (id) => {
  let client, result
  try {
    client = await connection();
    result = await client.query(adminQuerys.getArticuloPorID, [id])
    return result.rows[0];
  } catch (error) {
    console.log("Error en el modelo de get Articulo por id", error)
    return error;
  } finally{
    await client.end()
    console.log("<==============FINAL=============>")
  }
}

const anadirARTICULO = async ({ titulo, contenido, imagen_url }) => {
  let client, result
  try {
    client = await connection();
    result = await client.query(adminQuerys.anadirARTICULO, [titulo, imagen_url, contenido])
    return result.rows;
  } catch (error) {
    console.log(error, "error al añadir artículo en el modelo")
    return error;
  } finally{
    await client.end()
    // console.log("<==============FINAL=============>")
  }
}

const editarARTICULO = async (id, data) => {
  const {titulo, imagen_url, contenido} = data
  let client, result
  try {
    client = await connection();
    result = await client.query(adminQuerys.editarARTICULO, [id, titulo, imagen_url, contenido])
    return result.rows[0]; 
  } catch (error) {
    console.log("Error en modelo de editar un artículo", error)
    return error;
  } finally{
    await client.end()
    // console.log("<==============FINAL=============>")
  }
}

const eliminarARTICULO = async (id) => {
  console.log('hola desde el modelo eliminar articulo' , id)
  let client, result
  try {
    client = await connection();
    result = await client.query(adminQuerys.eliminarARTICULO, [id])
    console.log({result})
    return result.rows[0]; //Devuelve un objeto con la fila eliminada
  } catch (error) {
    console.log("Error en modelo de eliminar un artículo", error)
    return error;
  } finally{
    await client.end()
    // console.log("<==============FINAL=============>")
  }
}

const findOne = async (titulo) => {
  let client, result
  try {
    client = await connection();
    result = await client.query(adminQuerys.findOne, [titulo])
    return result.rows[0] || null;
  } catch (error) {
    console.log(error, "<===========================>")
    return error;
  } finally{
    await client.end()
    // console.log("<==============CIERRE DE CONEXIÓN=============>")
  }
}

const getAllArticlesModel = async () => {
    let client, result
    try {
        client = await connection();
        result = await client.query(inicioQuerys.getAllArticles)
        return result.rows //devuelve sólo las filas, que es un array de objetos
    } 
    catch (error) {
        console.log(error, "este el error en el modelo")
    } 
    finally {
        //cerramos la conexión de la base de datos
    await client.end()
    // console.log("<==============CIERRE DE CONEXIÓN=============>")
    }
    
}

// ------------------------------USUARIOS-------------------------------------------

const getTodosLosUSUARIOS = async () => {
  let client, result
  try {
    client = await connection()
    result = await client.query(adminQuerys.getTodosLosUSUARIOS)
    return result.rows //devuelve sólo las filas, que es un array de objetos
  } catch (error) {
        console.log(error, "este el error en el modelo")
    } 
    finally {
    await client.end()//cerramos la conexión de la base de datos
    // console.log("<==============CIERRE DE CONEXIÓN=============>")
    }
}

const buscarUnUSUARIO = async (busqueda) => {
    // const {busqueda} = body
    let client, result
    try {
        client = await connection()
        result = await client.query(adminQuerys.buscarUnUsuario,[busqueda])
        return result.rows //devuelve un array de de objetos con las filas de la tabla de la consulta
    } catch(error) {
        console.log('Este es el error al intentar buscar usuarios: ', error)
        throw error
    } finally {
        if (client) await client.end();
    }
}

const editarUSUARIO = async (id, data) => {
  console.log('hola desde el modelo editar usuario')
  const {nombre, email, id_rol} = data
  let client, result
  try {
    client = await connection();
    result = await client.query(adminQuerys.editarUSUARIO, [id, nombre, email, id_rol])
    return result.rows[0]; 
  } catch (error) {
    console.log("Error en modelo de editar un usuario", error)
    return error;
  } finally{
    await client.end()
    // console.log("<==============FINAL=============>")
  }
}

const getUsuarioPorID = async (id) => {
  let client, result
  try {
    client = await connection();
    result = await client.query(adminQuerys.getUsuarioPorID, [id])
    return result.rows[0];
  } catch (error) {
    console.log("Error en el modelo de get Usuario por id", error)
    return error;
  } finally{
    await client.end()
    // console.log("<==============FINAL=============>")
  }
}

const eliminarUSUARIO = async (id) => {
  let client, result
  try {
    client = await connection();
    result = await client.query(adminQuerys.eliminarUSUARIO, [id])
    return result.rows[0]; //Devuelve un objeto con la fila eliminada
  } catch (error) {
    console.log("Error en modelo de eliminar un usuario", error)
    return error;
  } finally{
    await client.end()
    // console.log("<==============FINAL=============>")
  }
}



module.exports = {
    getAllArticlesModel,
    getArticuloPorID,
    anadirARTICULO,
    editarARTICULO,
    eliminarARTICULO,
    findOne,
    getTodosLosUSUARIOS,
    buscarUnUSUARIO,
    editarUSUARIO,
    getUsuarioPorID,
    eliminarUSUARIO
}