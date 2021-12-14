const Message = require('../Models/MessageModel.js');

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

module.exports = { addMessage, getMessages };