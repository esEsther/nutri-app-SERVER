const adminQuerys = {
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
    findOne: `SELECT * FROM peliculas WHERE titulo = $1`,
}

module.exports = {
    adminQuerys
}