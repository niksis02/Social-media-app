const Notification = require('../Models/NotifModel.js');

const friendAddRequest = async (req, res) => {
    const requesterId = res.locals.id;
    const { receiverId } = req.body;
    if(!receiverId) {
        return res.json({status: 'error', msg: 'Id is required'});
    }
    try {
        const newFriendRequest = await Notification.create({
            from: requesterId,
            to: receiverId
        })
        return res.json({status: 'ok'});
    }
    catch(err) {
        return res.json({status: 'error', msg: err.message});
    }
}

const friendCancelRequest = async (req, res) => {
    const requesterId = res.locals.id;
    const { receiverId } = req.body;
    if(!receiverId) {
        return res.json({status: 'error', msg: 'Id is required'});
    }
    try {
        const notif = await Notification.findOneAndRemove({
            from: requesterId,
            to: receiverId
        });
        console.log(notif);
        res.json({status: 'ok'});
    }
    catch(err) {
        res.json({status: 'error', msg: err.message});
    }
}

module.exports = { friendAddRequest, friendCancelRequest };