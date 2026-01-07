const express = require("express") //usamos express para la conexión con el servidor
require('dotenv').config() // manejo de variables de entorno
var cors = require("cors") //un mecanismo de seguridad del navegador que permite a un servidor especificar qué dominios pueden acceder a sus recursos, evitando errores de seguridad al hacer llamadas entre diferentes orígenes
const multer = require('multer')
// const fs = require('node:fs')//con el namespace de node para evitar confisión con otra libreria
//configurar multer
// const upload = multer({ dest: 'public/upload' })
// const upload = multer({ storage: multer.memoryStorage() });


// const swaggerUi = require('swagger-ui-express');
// const swaggerDocument = require('./swagger.json');





const app = express()
const port = process.env.PORT 

//CUIDADO EN LA WHITELIST HAY QUE AÑADIR EL PUERTO QUE LLAMA DESDE EL FRONT
// var whitelist = [
//   "https://client-6sec.onrender.com",
//   "https://server-yo1g.onrender.com", 
//   `http://localhost:${port}`, 
//   "http://localhost:3001",
//   "http://127.0.0.1:3001",
//   "http://localhost:5173/"
// ];


// var corsOptions = {
//   origin: function (origin, callback) {
//     if (!origin) return callback(null, true); // Postman o server-side requests
//     if (whitelist.includes(origin)) {
//       return callback(null, true);
//     }
//     console.log("Origin bloqueado:", origin);
//     callback(new Error("Not allowed by CORS"));
//   },
//   credentials: true, // <--- importante para cookies
// };
// app.use(cors(corsOptions));
app.use(cors(
  {
  origin: process.env.URL_BASE, 
  methods: ['GET','POST','PUT','DELETE'],
  credentials: true, // si se envían cookies o headers
}
));


// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


//TEMPLATES

//MIDDLEWARE
app.use(express.json()) //permite que el server etienda solicitudes con cuerpo JSON
app.use(express.urlencoded({ extended: true })) //entiende datos enviados desde form html
app.use(express.static(__dirname + '/public')) //hace que todos los elementos dentro de la carpeta public sean accesibles publicamente




//RUTAS
app.use('/admin', require('./routes/admin.route'));
app.use('/', require('./routes/auth.route'));
app.use('/inicio', require('./routes/inicio.route'));
app.use('/user', require('./routes/user.route'))



//LISTENER
app.listen(port, () => {
  console.log(`Server on port ${port}`);
});