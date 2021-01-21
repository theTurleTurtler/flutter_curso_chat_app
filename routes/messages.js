/*
	Path: 'api/users'
*/
const { Router, response } = require('express');
const router = Router();
const {validarJWT} = require('../middlewares/validar_jwt');
const {obtainChat} = require('../controllers/messages');

router.get('/:from', validarJWT, obtainChat);

module.exports = router;