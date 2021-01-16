const {validationResult} = require('express-validator');
//la función next se ejecuta solo si al final todo el middleware sale bien.
//No se ejecutarán los demás middlewares y, por tanto, el método del controller, en
//la petición, si en algún middleware no se ecjecuta el .next()
const validarCampos = (req, res, next)=>{
	const errores = validationResult(req);
	if(!errores.isEmpty()){
		return res.status(400).json({
			ok: false,
			errors: errores
		});
	}
	next();
}

module.exports = {
	validarCampos
};
