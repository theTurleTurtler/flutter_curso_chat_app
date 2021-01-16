const {Schema, model} = require('mongoose');

const UserSchema = Schema({
	name: {
		type: String, 
		required: true
	},
	email: {
		type: String, 
		required: true,
		unique: true
	},
	password: {
		type: String, 
		required: true
	},
	online: {
		type: Boolean,
		default: false 
	},
});

UserSchema.method('toJSON', function(){
	//...object: en la variable object se van a guardar todos los demás elementos que no se extrapolaron
	const {__v, _id, password, ...object} = this.toObject();
	object.uid = _id;
	return object;
});

module.exports = model('User', UserSchema);