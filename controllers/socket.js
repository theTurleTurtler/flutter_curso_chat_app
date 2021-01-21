const User = require('../models/user');
const Message = require('../models/message');
const onConnectedUser = async(uid = '')=>{
    try{
        console.log('conectando user por sockets: ', uid);
        const user = await User.findById(uid);
        user.online = true;
        await user.save();
        console.log('cliente conectado por sockets');
        return user;
    }catch(err){
        console.log('Ocurrió un error', err);
    }
};

const onDisConnectedUser = async(uid = '')=>{
    try{
        console.log('desconectando usuario: ', uid);
        const user = await User.findById(uid);
        user.online = false;
        await user.save();
        return user;
    }catch(err){
        print('error desconectando usuario: ', err);
    }
};

const saveMessage = async(payload)=>{
    try{
        const message = Message(payload);
        await message.save();
        return true;
    }catch(err){
        return false;
    }
};

module.exports = {
    onConnectedUser,
    onDisConnectedUser,
    saveMessage
};