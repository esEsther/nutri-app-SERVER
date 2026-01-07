# Nutri App - Backend

Este repositorio contien la parte Backend del proyecto personal del Bootcamp Fullstack.

Se trata de una **Nutri App**, una aplicación web para búsqueda, consulta y gestión de artículos <!-- y recetas --> con control de acceso para **Usuarios** y **Administradores**

---

## Objetivo del proyecto 

Construir la capa de servidor que gestione:

- Login, registro y cierre de sesión mediante JWT y OAuth.  
- Control de roles (Usuario y Administrador) y protección de rutas.  
- CRUD completo de artículos y su almacenamiento en base de datos.  
- Asociación de artículos favoritas a los Usuarios.  
- Gestión de recuperación y restauración de contraseñas mediante enlace con JWT.  
- Exposición de los endpoints necesarios para el Frontend.  

<!-- aquí sólo he puesto los artículos, si llego  a hacer las recetas, meteré las recetas -->

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
│   ├── public/         # Archivos subidos (imágenes)
│   ├── swagger.json    # Documentación de swagger
│   └── app.js          # Punto de entrada principal
├── .env.template       # Plantilla de variables de entorno
├── querys.postgre.sql  # Plantilla de creación de la base de datos
└── package.json        # Dependencias y scripts 
```

<!-- aún no tengo la carpeta public -->


## Tecnologías utilizadas

### Núcleo
- Node.js  
- Express.js  

### Herramientas de desarrollo
- Git y GitHub  
- Nodemon  
- Postman para pruebas de endpoints
<!-- - Multer para subida de imágenes -->

### Autenticación y seguridad
- JSON Web Tokens (JWT)
- OAuth 2.0
- Bcrypt para hash de contraseñas
<!-- - Express-validator para validación de datos -->

## Endpoints principales
### Autenticación
- POST /auth/register - Registro de usuario
- POST /auth/login - Inicio de sesión
- POST /auth/logout - Cierre de sesión

### Admin
- GET /admin/dashboard - Obtener todas los artículos
<!-- - GET /admin/dashboard:id - Obtener película por ID
- POST /admin/createMovie - Crear nueva película (Admin)
- PUT /admin/editMovie/:id - Actualizar película (Admin)
- DELETE /admin/removeMovie/:id - Eliminar película (Admin) -->

### User
<!-- - GET /user/search - Buscar pelicula
- PUT /user/anadirFavoritos - Añadir película a favoritos
- POST /user/favoritos - Obtener todas las películas que están en favoritos de un usuario
- DELETE /user/deleteFavorito/ - Eliminar película de favoritos -->

## Roles y permisos
### Usuario
<!-- - Buscar películas
- Ver detalles de películas
- Añadir/eliminar películas de favoritos -->
- Actualizar su propio perfil

### Administrador
<!-- - Ver todas las películas
- Ver detalles de películas
- Crear nuevas películas
- Actualizar cualquier película
- Eliminar películas -->

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
# C:\Users\Pablo\OneDrive\Escritorio\Proyecto Front-Back\Server>npm run dev

> server@1.0.0 dev
> nodemon src/app.js

[nodemon] 3.1.11
[nodemon] to restart at any time, enter `rs`
[nodemon] watching path(s): *.*
[nodemon] watching extensions: js,mjs,cjs,json
[nodemon] starting `node src/app.js`
[dotenv@17.2.3] injecting env (3) from .env -- tip: 🔑 add access controls to secrets: https://dotenvx.com/ops
Server on port 4001
```

### Documentación de la api con swagger
<!-- - Teniendo el servidor en ejecución, vamos al navegador y escribimos:
```
http://localhost:4001/api-docs -->
```

## Url de despliegues:
<!-- - Servidor: https://server-yo1g.onrender.com -->


