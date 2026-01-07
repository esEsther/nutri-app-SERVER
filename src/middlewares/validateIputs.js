const {validationResult} = require("express-validator");
const {validateInputs} = (req, res, next) => {
    //las validaciones en las rutas guardan los errores en el req
    //validationResult extrae los errores, en este caso del req
    const errors=validationResult(req)
    if(!errors.isEmpty()){
        //si existen errores
        console.log(errors)
        return res.status(400).json({
            ok:false,
            msg:"Hay errores",
            errors: errors.mapped()
            //maped() manda un objeto donde la clave del objeto es el nombre del campo
            //y el valor es el error de ese campo especificado en los check
            // ejemplo:
            // {
                // email: {
                //     msg: "Email inválido",
                //     param: "email",
                //     location: "body"
                // },
        })
    }
    else{
        //si todo va bien y no hay errores, pasa a la siguiente función
        next();
    }
}

module.exports={
    validateInputs
}