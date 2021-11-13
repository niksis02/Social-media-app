const User = require('../Models/UserModel.js');
const Post = require('../Models/PostModel.js');
const Friend = require('../Models/FriendModel.js');
const Notification = require('../Models/NotifModel.js');


const getProfile = async (req, res) => {
    const { id } = req.body;
    const hostId = res.locals.id;

    try {
        const profileArray = await User.aggregate([
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
                    _id_str: id
                }
            },
            {
                $lookup: {
                    from: 'images',
                    let: {
                        id: '$_id_str'
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
                $lookup: {
                    from: 'images',
                    let: {
                        id: '$_id_str'
                    },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $eq: ["$$id", "$userId"],
                                }, 
                                coverPhoto: true
                            }
                        }
                    ],
                    as: 'coverPhotos'
                }
            },
            {
                $unwind: {
                    path: '$coverPhotos',
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $set: {
                    profilePic: '$profilePhotos.imageURL',
                    coverPic: '$coverPhotos.imageURL',
                }
            },
            {
                $unset: ['profilePhotos', 'coverPhotos', '_id_str']
            }
        ]);

        if(!profileArray[0]) {
            return res.json({status: 'error', msg: 'There is no such user'});
        } 
        else {
            const profile = profileArray[0];
            profile.hostId = hostId;

            if(hostId !== id) {
                const friend = await Friend.findOne({
                    user1: {
                        $in: [hostId, id]
                    },
                    user2: {
                        $in: [hostId, id]
                    }
                });

                if(Boolean(friend)) {
                    profile.friendStatus = 1
                }
                else {
                    const requesting = await Notification.findOne({
                        to: id,
                        from: hostId
                    });
    
                    const receiving = await Notification.findOne({
                        to: hostId,
                        from: id
                    });

                    if(Boolean(requesting) && !Boolean(receiving)) {
                        profile.friendStatus = 2;
                    }
                    else if(!Boolean(requesting) && Boolean(receiving)) {
                        profile.friendStatus = 3;
                    }
                    else if(!Boolean(requesting) && !Boolean(receiving)) {
                        profile.friendStatus = 4;
                    }
                }

            }
            else {
                profile.friendStatus = 0;
            }
            return res.json({status: 'ok', msg: profile});
        } 
    }
    catch(err) {
        return res.json({status: 'error', msg: err.message});
    }
}

const searchUser = async (req, res) => {
    const { regex, page } = res.locals;

    try {
        const userList = await User.aggregate([
            {
                $project: {
                    stringId: { '$toString': '$_id'},
                    fullName : { $concat: ['$name', ' ', '$surname'] },
                    name: '$name',
                    surname: '$surname',
                    gender: '$gender'
                }
            },
            {
                $match: {
                    fullName: regex
                }
            },
            {
                $lookup: {
                    from: 'images',
                    let: {
                        id: '$stringId'
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
                    as: 'profilePhoto'
                }
            },
            {
                $unset: ['fullName', 'stringId']
            },
            {
                $skip: 5 * page
            },
            {
                $limit: 5
            }
        ]);
    
        userList.map(elem => {
            return elem.profilePhoto = elem.profilePhoto[0] ? elem.profilePhoto[0].imageURL : null;
        })
        
        return res.json({status: 'ok', msg: userList});
    }
    catch(err) {
        res.json({status: 'error', msg: err.message});
    }
}

const getUser = async (req, res) => {
    const id = res.locals.id;

    try {
        const user = await User.aggregate([
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
                    _id_str: id
                }
            },
            {
                $lookup: {
                    from: 'images',
                    let: {
                        id: '$_id_str'
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
                $lookup: {
                    from: 'notifications',
                    localField: '_id_str',
                    foreignField: 'to',
                    as: 'notifs'
                }
            },
            {
                $set: {
                    profilePic: '$profilePhotos.imageURL',
                    notifNumber: {$size: '$notifs'}
                }
            },
            {
                $unset: ['profilePhotos', '_id_str', 'notifs']
            }
        ]);

        if(user[0]) {
            return res.json({status: 'ok', msg: user[0]});
        } 
        else {
            return res.json({status: 'error', msg: 'User not found!'});
        }
    }
    catch(err) {
        console.log(err);
        return res.json({status: 'error', msg: err.message});
    }
}

const getFeed = async (req, res) => {
    const id = res.locals.id;
    const { page } = req.body;

    if(typeof(page) !== 'number' || page % 1 !== 0 || page < 0) {
        return res.json({status: 'error', msg: 'Invalid page number'});
    }

    try {
        const friendArray = await Friend.aggregate([
            {
                $project: {
                    user1: '$user1',
                    user2: '$user2'
                }
            },
            {
                $match: {
                    $or: [
                        {user1: id},
                        {user2: id}
                    ]
                }
            }
        ]);
    
        const friends = friendArray.map(elem => {
            if(elem.user1 === id) {
                return elem.user2;
            }
            if(elem.user2 === id) {
                return elem.user1;
            }
        });

        const feed = await Post.aggregate([
            {
                $project: {
                    userId: '$userId',
                    objUserId: {$toObjectId: '$userId'},
                    _id_str: { '$toString': '$_id'}, 
                    content: '$content',
                    likes: '$likes',
                    comments: '$comments',
                    createdAt: '$createdAt',
                    hostId: id
                }
            },
            {
                $match: {
                    userId: {
                        $in: [...friends, id]
                    }
                }
            },
            {
                $lookup: {
                    from: 'images',
                    localField: '_id_str',
                    foreignField: 'postId',
                    as: 'images'
                }
            },
            {
                $unwind: {
                    path: '$images',
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $lookup: {
                    from: 'users',
                    localField: 'objUserId',
                    foreignField: '_id',
                    as: 'users'
                }
            },
            {
                $unwind: {
                    path: '$users',
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $lookup: {
                    from: 'images',
                    let: {
                        id: '$userId'
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
                $lookup: {
                    from: 'images',
                    let: {
                        id: '$userId'
                    },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $eq: ["$$id", "$userId"],
                                }, 
                                coverPhoto: true
                            }
                        }
                    ],
                    as: 'coverPhotos'
                }
            },
            {
                $unwind: {
                    path: '$coverPhotos',
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $set: {
                    image: '$images.imageURL',
                    isProfPic: '$images.profilePhoto',
                    current: '$images.current',
                    authorGender: '$users.gender',
                    authorName: '$users.name',
                    authorSurname: '$users.surname',
                    authorProfPic: '$profilePhotos.imageURL',
                    authorCoverPic: '$coverPhotos.imageURL',
                }
            },
            {
                $sort: {
                    createdAt: -1
                }
            },
            {
                $unset: ['_id_str', 'images', 'users', 'objUserId', 'profilePhotos', 'coverPhotos']
            },
            {
                $skip: 5 * page
            },
            {
                $limit: 5
            }
        ]);

        return res.json({status: 'ok', msg: feed});
    }
    catch(err) {
        return res.json({status: 'error', msg: err.message});
    }
    
}

const getNotifs = async (req, res) => {
    const { id } = res.locals;
    console.log('id: ', id);

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
    getProfile,
    searchUser,
    getUser,
    getFeed,
    getNotifs
};