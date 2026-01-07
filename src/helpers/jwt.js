var jwt = require("jsonwebtoken");

const JWTGenerator = (payload) => {
    return new Promise((resolve, reject) => {
        // crea el token a partir del los datos de usuario(payload)
        jwt.sign(
            payload,
            process.env.SECRET_KEY,
            {expiresIn: "2h"},
            //callback de jwt.sign. error-> si algo falla. token-> el jwt generado
            (error, token) => {
                if(error){
                    console.log(error)
                    // rechaza el error
                    reject (error)
                } else{
                    //devuelve el token al await
                    resolve (token)
                }
            }
        )
    })   
}

module.exports={
    JWTGenerator
}