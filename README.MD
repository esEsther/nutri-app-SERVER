# Nutri App - Backend

Este repositorio contien la parte Backend del proyecto personal del Bootcamp Fullstack.

Se trata de una **Nutri App**, una aplicación web para búsqueda, consulta y gestión de artículos <!-- y recetas --> con control de acceso para **Usuarios** y **Administradores**

---

## Objetivo del proyecto 

Construir la capa de servidor que gestione:

- Login, registro y cierre de sesión mediante JWT y OAuth.  
- Control de roles (Usuario y Administrador) y protección de rutas.  
- CRUD completo de artículos y su almacenamiento en base de datos.  
- Asociación de artículos favoritos a los Usuarios.  
- Función de traducción
- Asociación de recetas favoritas de los usuarios buscada en una api externa y guardada en nuestra base de datos
- Exposición de los endpoints necesarios para el Frontend.  



---

## Instalación

1. Forkear y clonar el repositorio:
```bash
# git clone https://github.com/PabloGartzi/Server.git
```
2. Accede al directorio del proyecto desde el CMD o consola de tu ordenador:
```bash
cd Server
```
3. Instala las dependencias:
```bash
npm install
```
4. Crea un archivo .env a partir del .env.template:
5. Configura las variables de entorno necesarias en el archivo .env

## Estructura del proyecto:
```
Server/
├── src/
│   ├── controllers/    # Controladores de la aplicación
│   ├── models/         # Modelos de datos
│   ├── routes/         # Definición de rutas
│   ├── middlewares/    # Middleware personalizado
│   ├── helpers/        # Utilidades y helpers
│   ├── config/         # Configuración de la aplicación
│   └── public/         
│        └──  upload/   # Archivos subidos (imágenes)
├── swagger.json        # Documentación de swagger
├── app.js              # Punto de entrada principal
├── .env.template       # Plantilla de variables de entorno
├── querys.postgre.sql  # Plantilla de creación de la base de datos
└── package.json        # Dependencias y scripts 
```



## Tecnologías utilizadas

### Núcleo
- Node.js  
- Express.js  

### Herramientas de desarrollo
- Git y GitHub  
- Nodemon  
- Postman para pruebas de endpoints
- Multer para subida de imágenes

### Autenticación y seguridad
- JSON Web Tokens (JWT)
- OAuth 2.0
- Bcrypt para hash de contraseñas
- Express-validator para validación de datos

## Endpoints principales
### Autenticación
- POST /auth/register - Registro de usuario
- POST /auth/login - Inicio de sesión
- POST /auth/logout - Cierre de sesión

### Admin
- POST	/admin/crearArticulo	Crear artículo
- GET	/admin/articulo/:id	Obtener artículo por ID
- PUT	/admin/editarArticulo/:id	Editar artículo
- DELETE	/admin/eliminarArticulo/:id	Eliminar artículo
- GET	/user/getTodosLosUsuarios	Obtener todos los usuarios
- GET	/user/buscarUsuario/:usuario	Buscar usuario por nombre
- POST	/user/crearUsuario	Crear usuario
- PUT	/user/editarUsuario/:id	Editar usuario
- DELETE	/user/eliminarUsuario/:id	Eliminar usuario

Todos los endpoints requieren:

- validarJWT
- validarRol([2])

### User

- GET	/user/dashboard/:id	Obtener artículo por ID
- GET	/user/buscar?titulo=	Buscar artículo por título
- POST	/user/anadirFavoritos	Añadir a favoritos
- GET	/user/favoritos/:tipo	Obtener favoritos
- DELETE	/user/deleteFavorito/:id/:tipo	Eliminar favorito
- POST	/user/anadirReceta	Añadir receta
- POST	/user/traducir	Traducir contenido

Todos los endpoints requieren:
- validarJWT
- validarRol([1])

### Inicio
- GET	/	Obtener todos los artículos
- GET	/receta/:id	Obtener receta por ID
- GET	/recetas	Obtener todas las recetas

## Roles y permisos
### Usuario
- Buscar artículos
- Ver detalles de artículos y recetas
- Añadir y eliminar artículos/recetas de favoritos
- Añadir nuevas recetas
- Traducir contenido
- Acceder a su dashboard

### Administrador
- Ver todos los usuarios
- Buscar usuarios
- Crear nuevos usuarios
- Editar cualquier usuario
- Eliminar usuarios
- Crear artículos
- Editar artículos
- Eliminar artículos
- Ver cualquier artículo por ID

## Ejecución del servidor 
1. Accede al directorio del proyecto desde el CMD o consola de tu ordenador:
```bash
cd Server
```
2. Dentro del directorio ejecutamos
```bash
npm run dev
```
Si todo es correcto mostrará algo como:
```bash

> server@1.0.0 dev
> nodemon src/app.js

[nodemon] 3.1.11
[nodemon] to restart at any time, enter `rs`
[nodemon] watching path(s): *.*
[nodemon] watching extensions: js,mjs,cjs,json
[nodemon] starting `node src/app.js`
[dotenv@17.2.3] injecting env (3) from .env -- tip: 🔑 add access controls to secrets: https://dotenvx.com/ops
Server on port 7001
```

### Documentación de la api con swagger
http://localhost:7001/api-docs/#/


## Url de despliegues:
https://nutri-app-server-h0ok.onrender.com
postgresql://nutriappdb_xo3j_user:GW1jX9UaRDax8HHBUhp5kTxm7JIn59Lf@dpg-d5j2c3ur433s738rv84g-a.frankfurt-postgres.render.com/nutriappdb_xo3j


