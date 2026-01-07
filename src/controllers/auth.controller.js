const bcrypt = require("bcryptjs");
const {findOne, anadir_usuario} = require("../models/auth.model")
const {JWTGenerator} = require("../helpers/jwt")


const createUser = async (req, res) => {
    console.log('Hola desde create user')
    try {
        console.log(req.body, 'req.body desde create user')
        const { nombre_usuario, email, password } = req.body;
        

        if (!nombre_usuario || !email || !password) {
            return res.status(400).json({ ok: false, msg: "Faltan campos obligatorios" });
        }

        const existe = await findOne(email);
        if (existe) {
            return res.status(409).json({ ok: false, msg: "Usuario existente" });
        }

        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password, salt);

        const id_rol = 1;
        const savedUser = await anadir_usuario(nombre_usuario, email, hashedPassword, id_rol);

        const payload = { uid: savedUser.id_usuario, rol: savedUser.id_rol };
        const token = await JWTGenerator(payload);
        console.log(token, ' este es el token desde auth controller')

        return res.status(200).json({
            ok: true,
            msg: "Usuario registrado correctamente",
            token
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ ok: false, msg: "Contacte con el administrador" });
    }
};


/*
 * TODO: 
 *  1.  Recoger el email y password del req.body
 *  2.  Comprobar si no existe un usuario con ese email
 *  3.  Comparar que las contraseñas coinciden
 *  4.  Generar el token
 */
const loginUser = async (req, res) => {

    console.log('Hola desde auth controlleres, loginUser')
    try {
        const {email, contrasenia} = req.body
        console.log(contrasenia)
        
        const usuario = await findOne(email);
        if(!usuario){
            return res.status(400).json({
                ok:false,
                msg: "No hay usuario con ese email"
            })
        }
        
        const passwordOk = bcrypt.compareSync(contrasenia, usuario.contrasenia)
        console.log(usuario.contrasenia)
        console.log(passwordOk, 'esta es la comparación de contraseña haseada del usuario ', email)

        if(!passwordOk){
            return res.status(401).json({
                ok:false,
                msg: "La contraseña no es válida"
            })
        }
        //console.log(usuario, "Usuario correcto--Llega hasta aqui")
        const payload ={
            uid: usuario.id_usuario,
            rol: usuario.id_rol
        }
        console.log(payload)
        const token = await JWTGenerator(payload)
        console.log(token)
        
        return res.status(200).json({
            ok:true,
            msg: "Login de usuario",
            usuario,
            token
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok:false,
            msg: "Contacte con el administrador"
        })
    }
}


const renewToken = async (req, res) => {
     console.log('Hola desde auth controlleres, renewToken')
    const {uid, rol} = req.userToken;
    //console.log(uid, rol)

    const token = await JWTGenerator({uid, rol})
    return res.status(200).json({
        ok:true,
        msg: "Renew de usuario",
        usuario: {
            uid,
            rol
        },
        token
    })
} 

module.exports={
    createUser,
    loginUser,
    renewToken
}