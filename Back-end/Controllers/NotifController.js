const Notification = require('../Models/NotifModel.js');
const { eventEmitter } = require('./FriendController.js');

eventEmitter.setMaxListeners(1);

const getNotifs = async (req, res) => {
    const { id } = res.locals;
    const { page } = req.body;

    if(typeof(page) !== 'number' || page % 1 !== 0 || page < 0) {
        return res.json({status: 'error', msg: 'Invalid page number'});
    }

    try {
        const notifs = await Notification.aggregate([
            {
                $project: {
                    _id: '$_id',
                    from: '$from',
                    to: '$to',
                    objUserId: {$toObjectId: '$from'},
                    createdAt: '$createdAt'
                }
            },
            {
                $match: {
                    to: id
                }
            },
            {
                $lookup: {
                    from: 'users',
                    localField: 'objUserId',
                    foreignField: '_id',
                    as: 'user'
                }
            },
            {
                $unwind: {
                    path: '$user',
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $lookup: {
                    from: 'images',
                    let: {
                        id: '$from'
                    },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $eq: ["$$id", "$userId"],
                                }, 
                                profilePhoto: true
                            }
                        }
                    ],
                    as: 'profilePhotos'
                }
            },
            {
                $unwind: {
                    path: '$profilePhotos',
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $set: {
                    requesterUserId: "$user._id",
                    requesterUserName: "$user.name",
                    requesterUserSurname: "$user.surname",
                    requesterUserGender: "$user.gender",
                    requesterProfPic: "$profilePhotos.imageURL"
                }
            },
            {
                $unset: ['profilePhotos', 'user', 'objUserId']
            },
            {
                $sort: {
                    createdAt: -1
                }
            },
            {
                $skip: 10 * page
            },
            {
                $limit: 10
            }
        ]);
        
        return res.json({status: 'ok', msg: notifs});
    }
    catch(err) {
        console.log(err);
        return res.json({status: 'error', msg: err.message});
    }

}

const getNotifRealTime = (req, res) => {
    const { id } = res.locals;
    eventEmitter.once('notif', function(notif) {
        if(notif.to === id) {
            return res.json(notif);
        }
    });
}

module.exports = {
    getNotifs,
    getNotifRealTime
}