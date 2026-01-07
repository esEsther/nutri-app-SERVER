//importamos client que es el cliente oficial de postgre y se usa para conectar a la bd y ejecutar querys
const {Client} = require('pg');

const connection = async () => {
    //creamos una instancia
    const client = new Client({
        //ponemos la cadena de conexión para no poner contraseñas en el código
        connectionString: process.env.CONNECTION_CHAIN, 
    });
    try {
        //intenta conectar con la base de datos
        await client.connect();
        console.log("Conectado a PostgreSQL correctamente");
        return client; // retorna el objeto client que se usará para ejecutar las querys

    } catch (error) {
        console.error("Error al conectar con PostgreSQL", error);
        return error
    } finally{
        //esta parte se ejecuta siempre haya error o no, pero en este caso no cierra la conexión,
        //solo imprime el mensaje
        console.log('Matando el servidor')
    }
};
module.exports = {connection};
