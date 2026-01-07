const authQuerys = {
    findOne: `SELECT * FROM usuarios WHERE email = $1`,
    anadir_usuario: `INSERT INTO usuarios (nombre, email, contrasenia, id_rol) VALUES ($1, $2, $3, $4) RETURNING *;`
}

module.exports = {
    authQuerys
}