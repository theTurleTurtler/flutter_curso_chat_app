//Para la generación del json web token
const jwt = require('jsonwebtoken');
const generarJWT = (uid = String)=>{
	return new Promise((resolve, reject)=>{
		const payload = {
			uid
		};
		jwt.sign(
			payload, process.env.JWT_KEY,
			{expiresIn: '48h'},
			(err, token=String)=>{
				if(err){
					reject('No se pudo generar el jsonwebtoken');
				}else {
					resolve(token);
				}
		});
	});
};

module.exports = {
	generarJWT
}
