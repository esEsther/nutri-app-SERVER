const userQuerys = {

    getArticuloPorTitulo: `SELECT * FROM articulos WHERE LOWER(titulo) LIKE '%' || LOWER(TRIM($1)) || '%'`,
    getArticulosFavoritos: `SELECT * FROM articulos 
    INNER JOIN favoritos ON articulos.id_articulo = favoritos.id_articulo
    WHERE favoritos.id_usuario = $1`,
    eliminarFavorito: `DELETE FROM favoritos WHERE id_usuario = $1 AND id_articulo = $2 RETURNING *;`,
    guardarArticuloFavorito: `INSERT INTO favoritos (id_articulo, id_usuario) VALUES ($1, $2) RETURNING *;`,
    existeEnFavoritos: `SELECT * FROM favoritos WHERE id_articulo = $1 AND id_usuario = $2`,
    getArticuloPorId: `SELECT * FROM articulos WHERE id_articulo = $1`,
}


module.exports = {
    userQuerys
}