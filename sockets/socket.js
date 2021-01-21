const {io} = require('../index.js');
const {comprobarJWT} = require('../middlewares/validar_jwt');
const {onConnectedUser, onDisConnectedUser, saveMessage} = require('../controllers/socket');
//client: un dispositivo que se acaba de conectar a mi socket server
io.on('connection', client=>{
    //TODO: Verificar el json web token
    const token = client.handshake.headers['authorization'];
    const [valido, uid] = comprobarJWT(token);
    if(!valido){
        console.log('No valido');
        client.disconnect();
        return;
    }
    onConnectedUser(uid);
    //Ingresar al usuario a una sala especifica
    //Hay dos tipos de sala: global, con client.id, sala con el uid del usuario
    //Unimos al cliente a una sala cuyo id va a ser el mismo id del cliente.
    //Supongo que si esa sala no existe, se crea.
    client.join(uid);
    client.on('send_private_message', async(payload)=>{
        await saveMessage(payload);
        client.to(payload.for).emit(
            'send_private_message',
            payload
        );
    });
    client.on('disconnect', ()=>{
        onDisConnectedUser(uid);
    });
});
