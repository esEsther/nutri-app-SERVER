const {connection} = require('../config/dbConnect') 
const {authQuerys} = require("./auth.querys.js");

const findOneUser = async (email) => {
  let client, result
  // console.log('Hola desde el model encontrar')
  try {
    client = await connection();
    result = await client.query(authQuerys.findOne, [email])
    return result.rows[0] || null;
  } catch (error) {
    console.log(error, "<===========================>")
    return error;
  } finally{
    await client.end()
    // console.log("<==============CIERRE DE CONEXIÓN=============>")
  }
}

 const anadir_usuario = async (nombre, email, hashedPassword, id_rol) => {
  let client, result
  // console.log('hola desde el modelo crear usuario')
  try {
    client = await connection();
    // hacer la query
    result = await client.query(authQuerys.anadir_usuario, [nombre, email, hashedPassword, id_rol])
    return result.rows[0];
  } catch (error) {
    console.log(error, "<===========================>")
    return error;
  } finally{
    await client.end()
    // console.log("<==============CIERRE DE CONEXIÓN=============>")
  }
}


module.exports= {
  findOneUser,
  anadir_usuario
}