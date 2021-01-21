const Message = require('../models/message');
const obtainChat = async(req, res)=>{
    const myUid = req.uid;
    const fromUid = req.params.from;
    console.log(`my uid: ${myUid}`);
    console.log(`from uid: ${fromUid}`);
    //Que obtenga los mensajes en los que se cumpla que {from = myUid && for = fromUid} OR {from = fromUid, for = myUid}
    const last30Messages = await Message.find({
        $or: [{from: myUid, for: fromUid}, {from: fromUid, for: myUid}]
    })
    .sort({ createdAt: 'desc'})
    .limit(30);
    console.log('last 30: ');
    console.log(last30Messages);
    res.json({
        ok: true,
        message: 'New message',
        myUid,
        fromUid,
        messages: last30Messages
    });
};

module.exports = {
    obtainChat
}