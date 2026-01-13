

const inicioQuerys = {
    getAllArticles: `SELECT * FROM articulos`,
    getTodasLasRecetas: `SELECT * FROM recetas`,
    getRecetaPorID: `SELECT * FROM recetas WHERE id_receta = $1`
}

module.exports = {
    inicioQuerys
}