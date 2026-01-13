

const adminQuerys = {
    //---------------------------------ARTUCULOS
    getTodosLosARTICULOS: `SELECT * FROM articulos`,
    getArticuloPorID: `SELECT * FROM articulos WHERE id_articulo = $1`,
    anadirARTICULO: `INSERT INTO articulos (titulo, imagen_url, contenido) VALUES ($1, $2, $3) RETURNING *;`,
    editarARTICULO: `UPDATE articulos SET 
                    titulo = COALESCE($2, titulo),
                    imagen_url = COALESCE($3, imagen_url),
                    contenido = COALESCE($4, contenido)
                    WHERE id_articulo = $1
                    RETURNING *;`,
    eliminarARTICULO: `DELETE FROM articulos WHERE id_articulo = $1 RETURNING *;`,
    findOne: `SELECT * FROM recetas WHERE titulo = $1`,
//-------------------------USUARIOS----------------------------------------
    getTodosLosUSUARIOS: `SELECT * FROM usuarios`,
    buscarUnUsuario: `SELECT *  FROM usuarios
                     WHERE  nombre ILIKE '%' || $1 || '%'
                            OR email ILIKE '%' || $1 || '%'
                            OR id_rol::TEXT ILIKE '%' || $1 || '%'`,
    editarUSUARIO:  `UPDATE usuarios SET
                    nombre = COALESCE($2, nombre),
                    email = COALESCE($3, email),
                    id_rol = COALESCE($4, id_rol)
                    WHERE id_usuario = $1
                    RETURNING *`,
                    // contrasenia = COALESCE($4, contrasenia),     
    getUsuarioPorID: `SELECT * FROM usuarios WHERE id_usuario = $1`,
    eliminarUSUARIO: `DELETE FROM usuario WHERE id_usuario = $1 RETURNING *;`

}

module.exports = {
    adminQuerys
}