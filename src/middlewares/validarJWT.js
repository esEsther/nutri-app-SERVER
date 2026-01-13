const jwt = require("jsonwebtoken");


const validarJWT = (req, res, next) =>{
    // console.log(req.headers)
    const token = req.headers['authorization'].split(" ")[1]
    // console.log(token)
    if(!token){
        return res.status(401).json({
            ok: false,
            msg: "No hay token en la petición"
        })
    }
    try {
        //jwt.verify comprueba que el token no haya sido modificado,
        // comprueba si el token no está caducado y devuelve el contenido del payload
        const payload = jwt.verify(token, process.env.SECRET_KEY)
        if(!payload){
        return res.status(401).json({
            ok: false,
            msg: "PAYLOAD NO VALIDO"
        })
        }
        // console.log({payload})
        const userToken = {
            uid: payload.uid,
            rol: payload.rol
        }
        req.userToken = userToken

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false,
            msg: "ERROR"
        })
    }
    next()
}




module.exports={validarJWT}