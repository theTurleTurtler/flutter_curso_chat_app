const jwt = require('jsonwebtoken');
const validarJWT = (req, res, next)=>{
    try{
        const token = req.header('Authorization');
        if(!token){
            return res.status(401).json({
                ok: false,
                msg: 'El authorization token es necesario'
            });
        }
        const {uid} = jwt.verify(token, process.env.JWT_KEY);
        req.uid = uid;
        next();
    }catch(err){
        console.log('Ocurrió un error', err);
        res.status(401).json({
            ok: false,
            msg: 'Token no válido'
        });
    }
    
};

module.exports = {
    validarJWT
};