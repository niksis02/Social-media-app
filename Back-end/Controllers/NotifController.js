const Notification = require('../Models/NotifModel.js');

const getNotifs = async (req, res) => {
    const { id } = res.locals;

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
            }
        ]);
        console.log(notifs);
        return res.json({status: 'ok', msg: notifs});
    }
    catch(err) {
        console.log(err);
        return res.json({status: 'error', msg: err.message});
    }

}

module.exports = {
    getNotifs
}