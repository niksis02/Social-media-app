const Message = require('../Models/MessageModel.js');
const User = require('../Models/UserModel.js');

const addMessage = async (req, res) => {
    try {
        const newMessage = await Message.create(req.body);
        return res.json({status: 'ok', msg: newMessage._id});
    }
    catch(err) {
        return res.json({status: 'error', msg: err.message});
    }
}

const getMessages = async (req, res) => {
    const { senderId: user1Id, receiverId: user2Id, page } = req.body;


    if(typeof(page) !== 'number' || page % 1 !== 0 || page < 0) {
        return res.json({status: 'error', msg: 'Invalid page number'});
    }


    try {
        const messages = await Message.aggregate([
            {
                $project: {
                    senderId: '$senderId',
                    receiverId: '$receiverId',
                    text: '$text',
                    createdAt: '$createdAt'
                }
            },
            {
                $match: {
                    $and: [
                        {
                            senderId:  {
                                $in: [user1Id, user2Id]
                            }
                        },
                        {
                            receiverId:  {
                                $in: [user1Id, user2Id]
                            }
                        }
                    ]
                }
            },
            {
                $sort: {
                    createdAt: 1
                }
            },
            {
                $skip: 10 * page
            },
            {
                $limit: 10
            }
        ]);

        console.log('page: ', page);

        return res.json({status: 'ok', msg: messages});
    }
    catch(err) {
        console.log(err);
        res.json({status: 'error', msg: err.message});
    }
}

const getChats = async (req, res) => {
    const { id } = res.locals;
    const { page } = req.body;
    try {
        const messages = await Message.aggregate([
            {
                $project: {
                    message: '$text',
                    senderId: '$senderId',
                    receiverId: '$receiverId',
                    createdAt: '$createdAt'
                }
            },
            {
                $match: {
                    $or: [
                        {
                            senderId: id
                        },
                        {
                            receiverId: id
                        }
                    ]
                }
            }
        ]);
        
        const uniqueMessages = messages.reverse().filter((message, index, list) => {
            return index === list.findIndex(e => 
                (e.senderId === message.senderId && e.receiverId === message.receiverId) || 
                (e.receiverId === message.senderId && e.senderId === message.receiverId)
                );
        });

        const messageUserIds = uniqueMessages.map(elem => elem.senderId !== id? elem.senderId: elem.receiverId);
        console.log(messageUserIds);
        console.log('id: ', id);

        const messengerUsers = User.aggregate([
            {
                $project: {
                    _id_str: { '$toString': '$_id'}, 
                    name: '$name',
                    surname: '$surname',
                    gender: '$gender'
                }
            },
            {
                $match: {
                    _id_str: {
                        $in: messageUserIds
                    }
                }
            }
        ]);

    }
    catch(err) {
        return res.json({status: 'error', msg: err.message});
    }
}

module.exports = { addMessage, getMessages, getChats };