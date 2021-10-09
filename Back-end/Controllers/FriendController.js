const Notification = require('../Models/NotifModel.js');
const Friend = require('../Models/FriendModel.js');

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
        
        return res.json({status: 'ok'});
    }
    catch(err) {
        return res.json({status: 'error', msg: err.message});
    }
}

const friendDeleteRequest = async (req, res) => {
    const requesterId = res.locals.id;
    const { receiverId } = req.body;

    if(!receiverId) {
        return res.json({status: 'error', msg: 'Id is required'});
    }
    try {
        const notif = await Notification.findOneAndRemove({
            from: receiverId,
            to: requesterId
        });
        
        return res.json({status: 'ok'});
    }
    catch(err) {
        return res.json({status: 'error', msg: err.message});
    }
}

const friendConfirmRequest = async (req, res) => {
    const requesterId = res.locals.id; // hostId
    const { receiverId } = req.body;

    if(!receiverId) {
        return res.json({status: 'error', msg: 'Id is required'});
    }
    try {
        const notif = await Notification.findOneAndRemove({
            from: receiverId,
            to: requesterId
        });

        if(notif) {
            const friendCheck = await Friend.findOne({
                user1: {
                    $in: [requesterId, receiverId]
                },
                user2: {
                    $in: [requesterId, receiverId]
                }
            });

            if(Boolean(friendCheck)) {
                return res.json({status: 'error', msg: 'Oops! such friend compilation already exists!'});
            }

            const newFriend = await Friend.create({
                user1: requesterId,
                user2: receiverId
            });

            return res.json({status: 'ok'});
        }
        else {
            return res.json({status: 'error', msg: 'There is no such friend request to confirm'})
        }
    }
    catch(err) {
        return res.json({status: 'error', msg: err.message});
    }
}

const friendDelete = async (req, res) => {
    const requesterId = res.locals.id; // hostId
    const { receiverId } = req.body;

    if(!receiverId) {
        return res.json({status: 'error', msg: 'Id is required'});
    }

    try{
        const deletedFriend = await Friend.findOneAndRemove({
            user1: {
                $in: [requesterId, receiverId]
            },
            user2: {
                $in: [requesterId, receiverId]
            }
        });

        res.json({status: 'ok'});

    }
    catch(err) {
        return res.json({status: 'error', msg: err.message});
    }
}



module.exports = { 
    friendAddRequest, 
    friendCancelRequest,
    friendDeleteRequest,
    friendConfirmRequest,
    friendDelete
};