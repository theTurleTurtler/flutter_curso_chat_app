const { response } = require("express");
const User = require('../models/user');

const getUsers = async(req, res = response)=>{
    const from = Number(req.query.from) || 0;
    //$ne: ¿not existence o not equals?
    // find los users cuyo id ne al req.id(?)
    const users = await User.find(
        {_id: {$ne: req.uid}}
    )
    .sort('-online')
    .skip(from)
    .limit(10);
    res.json({
        ok: true,
        msg: 'Get users ok',
        users,
        from
    });
}

module.exports = {
    getUsers
};