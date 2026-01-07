const {connection} = require('../config/dbConnect')
const {adminQuerys} = require("./admin.querys");


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
    console.log("<==============CIERRE DE CONEXIÓN=============>")
    }
    
}

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
    console.log("<==============FINAL=============>")
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
    console.log("<==============FINAL=============>")
  }
}

const eliminarARTICULO = async (id) => {
  let client, result
  try {
    client = await connection();
    result = await client.query(adminQuerys.eliminarARTICULO, [id])
    return result.rows[0]; //Devuelve un objeto con la fila eliminada
  } catch (error) {
    console.log("Error en modelo de editar un artículo", error)
    return error;
  } finally{
    await client.end()
    console.log("<==============FINAL=============>")
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
    console.log("<==============CIERRE DE CONEXIÓN=============>")
  }
}




module.exports = {
    getAllArticlesModel,
    getArticuloPorID,
    anadirARTICULO,
    editarARTICULO,
    eliminarARTICULO,
    findOne
}