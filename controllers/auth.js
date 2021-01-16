const { response } = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const { generarJWT } = require('../helpers/jwt.js');

const register = async(req, res = response) => {
	try{
		const {email, password} = req.body;
		//Encuentre si hay alguno que tenga el mismo email que el que se está pasando como parámetro
		const emailAlreadyExists = await User.findOne({email:email});
		if(emailAlreadyExists){
			return res.status(400).json({
				ok: false,
				msg: 'El email ya está registrado'
			});
		}
		const newUser = new User(req.body);
		//encriptar password
		const salt = bcrypt.genSaltSync();
		newUser.password = bcrypt.hashSync(password, salt);
		await newUser.save();
		const token = await generarJWT(newUser.id);
		res.json({
			ok: true,
			body: newUser,
			token,
			msg: 'Successful registration'
		});
	}catch(err){
		console.log('Ocurrió un error');
		console.log(err);
		res.status(500).json({
			ok: false,
			msg:'Hablese con el administrador, mijo'
		});
	}
};

const login = async(req, res = response) =>{
	try{
		const {email, password} = req.body;
		const userInformation = await User.findOne({email:email});

		if(!userInformation){
			return res.status(404).json({
				ok:false,
				msg:'Credenciales inválidas (Email, mijo)'
			});
		}
		const passwordValid = bcrypt.compareSync(password, userInformation.password);
		if(!passwordValid){
			return res.status(400).json({
				ok:false,
				msg:'Credenciales inválidas (Password, mijo)'
			});
		}
		const token = await generarJWT(userInformation.id);
		return res.status(200).json({
			ok:true,
			msg:'Loggeado con éxito',
			user: userInformation,
			token
		});
	}catch(err){
		console.log("Ocurrió un error:", err);
		res.status(500).json({
			ok: false,
			msg: 'Hablese con el admin, papá, que ocurrió un error en el server',
			err: err
		});
	}
};

const reLogin = async(req, res = response)=>{
	try{
		const uid = req.uid;
		const token = await generarJWT(uid);
		const userInformation = await User.findById(uid);
		res.status(200).json({
			ok: true,
			msg: 're new exitoso',
			uid: req.uid,
			token,
			user: userInformation
		});
	}catch(err){
		console.log(err);
		res.status(500).json({
			ok: false,
			msg: 'Ocurrió un error en el servidor. Hablate con el admin, papá',
			err: err
		});
	}
};

module.exports = {
	register,
	login,
	reLogin
};
