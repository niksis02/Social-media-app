const User = require('../Models/UserModel.js');
const Post = require('../Models/PostModel.js');
const Image = require('../Models/ImageModel.js');
const Friend = require('../Models/FriendModel.js');
const Notification = require('../Models/NotifModel.js');


const getUser = async (req, res) => {
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

module.exports = {
    getUser,
    searchUser
};