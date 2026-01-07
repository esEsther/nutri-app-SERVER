const {connection} = require('../config/dbConnect') 
const {inicioQuerys} = require('./inicio.querys')

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

module.exports = {
    getAllArticlesModel
}