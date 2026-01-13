

const userQuerys = {

    getArticuloPorTitulo: `SELECT * FROM articulos WHERE LOWER(titulo) LIKE '%' || LOWER(TRIM($1)) || '%'`,
    getArticulosFavoritos: `SELECT * FROM articulos 
    INNER JOIN favoritos ON articulos.id_articulo = favoritos.id_articulo
    WHERE favoritos.id_usuario = $1`,
    getRecetasFavoritos: `SELECT * FROM recetas 
    INNER JOIN recetasFavoritas ON recetas.id_receta = recetasFavoritas.id_receta
    WHERE recetasFavoritas.id_usuario = $1`,
    eliminarArticuloFavorito: `DELETE FROM favoritos WHERE id_usuario = $1 AND id_articulo = $2 RETURNING *;`,
    eliminarRecetaFavorito: `DELETE FROM recetasFavoritas WHERE id_usuario = $1 AND id_receta = $2 RETURNING *;`,
    guardarArticuloFavorito: `INSERT INTO favoritos (id_articulo, id_usuario) VALUES ($1, $2) RETURNING *;`,
    guardarRecetaFavorito: `INSERT INTO recetasFavoritas (id_receta, id_usuario) VALUES ($1, $2) RETURNING *;`,
    anadirRECETA: `INSERT INTO recetas (titulo, imagen_url, contenido, id_receta) VALUES ($1, $2, $3, $4) RETURNING *;`,
    existeArticuloFavoritos: `SELECT * FROM favoritos WHERE id_articulo = $1 AND id_usuario = $2`,
    existeRecetaFavoritos: `SELECT * FROM recetasFavoritas WHERE id_receta = $1 AND id_usuario = $2`,
    getArticuloPorId: `SELECT * FROM articulos WHERE id_articulo = $1`,
    findOne: `SELECT * FROM recetas WHERE id_receta = $1`,
}


module.exports = {
    userQuerys
}