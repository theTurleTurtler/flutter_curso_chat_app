const {io} = require('../index.js');

//client: un dispositivo que se acaba de conectar a mi socket server
io.on('connection', client=>{
    console.log('cliente conectado');
    client.emit('civilizaciones_activas', 0);
    client.on('disconnect', ()=>{
        console.log('cliente desconectado');
    });
    client.on('mensaje', (data)=>{
        console.log('ha llegado un mensaje:', data);
        io.emit('mensaje_ingresado', {admin: "ha llegado un nuevo mensaje al servidor"});
        client.emit('mensaje', {admin: "esta es la respuesta al mensaje que enviaste al servidor"});
        //client.broadcast.etmit: emitir evento a todos menos a client.
        client.broadcast.emit('mensaje', {admin:'esta es la respuesta al último mensaje envíado al servidor'});
    });
    client.on('mensaje_desde_flutter', (data)=>{
        console.log('ha llegado un mensaje desde flutter:\n', data);
    });
    client.on('mensaje_desde_flutter_status',  (data)=>{
        console.log('se ha recibido un mensaje desde flutter status: ', data);
        io.broadcast.emit('mensaje_desde_flutter_status', data);
    });
    client.on('add_civilization', (data)=>{
        console.log('add civilization:', data);
        io.emit('civilizaciones_activas', 0);

    });
    client.on('vote_civilization', (data)=>{
        console.log('id de votado: ', data);
        io.emit('civilizaciones_activas', 0 );
    })
    client.on('remove_civilization', (data)=>{
        console.log('id del eliminado: ', data);
        io.emit('civilizaciones_activas', 0);
    });
});
