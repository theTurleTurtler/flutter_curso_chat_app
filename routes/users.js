/*
	Path: 'api/users'
*/
const { Router, response } = require('express');
const router = Router();
const {validarJWT} = require('../middlewares/validar_jwt');
const {getUsers} = require('../controllers/users');

router.get('/', validarJWT, getUsers);

module.exports = router;