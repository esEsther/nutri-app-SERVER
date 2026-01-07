const jwt = require("jsonwebtoken");

const validarRol = ((rolesPermitidos) => {
    return (req, res, next) => {
        const rol = req.userToken.rol;

        if (!rolesPermitidos.includes(rol)) {
            return res.status(403).json({
                of: false,
                msg: "No tienes permisos." 
            })
        }
        next();
    };
})


module.exports={validarRol}