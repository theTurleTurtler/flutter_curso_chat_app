/*
	Path: 'api/login'
*/
const { Router, response } = require('express');
const {check} = require('express-validator');
const router = Router();
const {register, login, reLogin} = require('../controllers/auth.js');
const {validarCampos} = require('../middlewares/validar_campos.js');
const {validarJWT} = require('../middlewares/validar_jwt');

router.post( '/new',[
		check('name', 'El campo name es obligatorio').not().isEmpty(),
		check('email', 'El campo email es obligatorio').not().isEmpty(),
		check('email', 'El campo email no está en un formato correcto').isEmail(),
		check('password', 'El campo password es obligatorio').not().isEmpty(),
		validarCampos
	],
	(req, res = response)=>{register(req, res)}
);

router.post('/', [
		check('email', 'El email es obligatorio').not().isEmpty(),
		check('password', 'El password es obligatorio').not().isEmpty(),
		validarCampos
	],
	(req, res = response)=>{login(req, res)}
);

router.get('/relogin',[
		validarJWT
	],
	(req, res = response)=>{reLogin(req, res)}
);


module.exports = router;
