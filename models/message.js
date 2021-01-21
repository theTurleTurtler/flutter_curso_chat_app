const {Schema, model} = require('mongoose');

const MessageSchema = Schema({
	from: {
        type: Schema.Types.ObjectId,
        ref: 'User', 
		required: true
	},
	for: {
		type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
	},
	message: {
        type: String, 
        required: true
    }
}, {
    timestamps: true
});

MessageSchema.method('toJSON', function(){
	//...object: en la variable object se van a guardar todos los demás elementos que no se extrapolaron
	const {__v, _id, ...object} = this.toObject();
	return object;
});

module.exports = model('Message', MessageSchema);