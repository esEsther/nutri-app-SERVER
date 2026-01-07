const multer = require("multer");
const fs = require("node:fs"); //módulo de node para trabajar con archivos
require('dotenv').config() 


// Configuración simple: subidas a /public/upload. se guardan temporalmente.
// Cada archivo subido recibe un nombre generado automáticamente por Multer (algo como f9a8b7c.jpg) mientras lo procesas.
const upload = multer({ dest: "src/public/upload" });

// Función para renombrar la imagen a su nombre original
const saveImage = (file) => { //file es el objeto que multer agrega al req.file cuando se sube el archivo
    const newPath = `src/public/upload/${file.originalname}`; 
    fs.renameSync(file.path, newPath);//renombra el archivo con su nombre original y se guarda en la carpeta pública
    const publicURL = `${process.env.URL_BASE}/upload/${file.originalname}`; //construye una url publica para acceder al archivo desde del navegador
    return publicURL;
}

module.exports = {
    upload,
    saveImage
};
