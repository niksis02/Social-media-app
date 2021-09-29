const User = require('../Models/UserModel.js');
const Post = require('../Models/PostModel.js');
const Image = require('../Models/ImageModel.js');


const getUser = async (req, res) => {
    const { id } = req.body;
    const hostId = res.locals.id;
    try {
        const profileInfoArray = await User.aggregate([
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

        const posts = await Post.aggregate([
            {
                $project: {
                    userId: '$userId',
                    _id_str: { '$toString': '$_id'}, 
                    content: '$content',
                    likes: '$likes',
                    comments: '$comments',
                    createdAt: '$createdAt'
                }
            },
            {
                $match: {
                    userId: id
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
                $set: {
                    image: '$images.imageURL',
                    isProfPic: '$images.profilePhoto',
                    current: '$images.current'
                }
            },
            {
                $unset: ['_id_str', 'images']
            }
        ]);
        if(!profileInfoArray[0]) {
            return res.json({status: 'error', msg: 'There is no such user'});
        } 
        else {
            const profileInfo = profileInfoArray[0];

            profileInfo.host = id === hostId;
            profileInfo.posts = posts;
            profileInfo.hostId = hostId;

            return res.json({status: 'ok', msg: profileInfo});
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