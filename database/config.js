const mongoose = require('mongoose');

const dbConnection = async()=>{
	try{
		console.log('init db config');
		await mongoose.connect( process.env.DB_CNN, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useCreateIndex: true
		}).catch((err)=>{
			console.log(`Ocurrió un error. ${err}`);
		});
		console.log('*****************************');
		console.log('Db online');
	}catch(err){
		console.log(err);
		throw Error('Ocurrió un error en la base de datos. Comuniquese con el admin. Lo siento si el admin es usted: ', err);
	}
}

module.exports = {
	dbConnection
};