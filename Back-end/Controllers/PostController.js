const upload = require('../Utils/Multer.js');
const cloudinary = require('../Utils/Cloudinary.js');

const Post = require('../Models/PostModel.js');
const Image = require('../Models/ImageModel.js');
const User = require('../Models/UserModel.js');
const Friend = require('../Models/FriendModel.js');

const postAdd = async (req, res) => {
    try {
        const post = {
            userId: res.locals.id,
            content: req.body.content
        }
        const newPost = await Post.create(post);

        const result = await cloudinary.uploader.upload(req.file.path);
        const newImage = await Image.create({
            userId: res.locals.id,
            postId: newPost.id,
            imageURL: result.secure_url,
            profilePhoto: false,
            coverPhoto: false,
            current: false
        });
        return res.json({status: 'ok'});
    } 
    catch(err) {
        return res.json({status: 'error', msg: err.message});
    }
}

const postLikeAdd = async(req, res) => {
    try {
        const userId = res.locals.id;
        const { postId } = req.body;
        console.log('userId', userId, '   postId:', postId);

        if(!postId || typeof(postId) !== 'string') {
            return res.json({status: 'error', msg: 'Oops, postId is required'});
        }

        const result = await Post.findOneAndUpdate({_id: postId}, 
        { 
            $addToSet: {
                likes: userId
            },
        }
        );
        console.log(result.likes);
        return res.json({status: 'ok'});
    } catch(err) {
        return res.json({status: 'error', msg: err.message});
    }
}

const postLikeRemove = async(req, res) => {
    try {
        const userId = res.locals.id;
        const { postId } = req.body;

        if(!postId || typeof(postId) !== 'string') {
            return res.json({status: 'error', msg: 'Oops, postId is required'});
        }

        const result = await Post.findOneAndUpdate({_id: postId}, { 
            $pull: {
                likes: userId
            }
        });

        return res.json({status: 'ok'});
    } catch(err) {
        return res.json({status: 'error', msg: err.message});
    }
}

const getProfileFeed = async (req, res) => {
    const { page, id } = req.body;
    const requesterId = res.locals.id;

    if(typeof(page) !== 'number' || page % 1 !== 0 || page < 0) {
        return res.json({status: 'error', msg: 'Invalid page number'});
    }

    try {
        const posts = await Post.aggregate([
            {
                $project: {
                    userId: '$userId',
                    _id_str: { '$toString': '$_id'}, 
                    content: '$content',
                    likes: {$size: '$likes'},
                    comments: {$size: '$comments'},
                    isLikedByCurrentUser: { $in: [requesterId, '$likes']},
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
                $sort: {
                    createdAt: -1
                }
            },
            {
                $unset: ['_id_str', 'images']
            },
            {
                $skip: 5 * page
            },
            {
                $limit: 5
            }
        ]);
        
        return res.json({status: 'ok', msg: posts});
    }
    catch(err) {
        return res.json({status: 'error', msg: err.message})
    }
}

const getPostLikes = async (req, res) => {
    const { postId, page } = req.body;
    const requesterId = res.locals.id;

    if(typeof(page) !== 'number' || page % 1 !== 0 || page < 0) {
        return res.json({status: 'error', msg: 'Invalid page number'});
    }


    try {
        const likeArray = await Post.findById(postId, 'likes');

        console.log('likeArray:', likeArray);

        let likeUsersArray = await User.aggregate([
            {
                $project: {
                    name: '$name',
                    surname: '$surname',
                    gender: '$gender',
                    _id_str: { '$toString': '$_id'}
                }
            },
            {
                $match: {
                    _id_str: {
                        $in: likeArray.likes
                    }
                }
            },
            {
                $lookup: {
                    from: 'images',
                    let: {
                        id: { '$toString': '$_id'},
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
                    from: 'friends',
                    let: {
                        user1Id: '$_id_str',
                        user2Id: requesterId
                    },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $and: [
                                        {
                                            $or: [
                                                {
                                                    $eq: ['$$user1Id', '$user1']
                                                },
                                                {
                                                    $eq: ['$$user2Id', '$user1']
                                                }
                                            ]
                                        },
                                        {
                                            $or: [
                                                {
                                                    $eq: ['$$user1Id', '$user2']
                                                },
                                                {
                                                    $eq: ['$$user2Id', '$user2']
                                                }
                                            ]
                                        }
                                    ]
                                }
                            }
                        }
                    ],
                    as: 'isFriend'
                }
            },
            {
                $lookup: {
                    from: 'notifications',
                    let: {
                        user: '$_id_str',
                        host: requesterId
                    },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $and: [
                                        {
                                            $eq: ['$$user', '$to']
                                        },
                                        {
                                            $eq: ['$$host', '$from']
                                        }
                                    ]
                                }
                            }
                        }
                    ],
                    as: 'sentRequest'
                }
            },
            {
                $lookup: {
                    from: 'notifications',
                    let: {
                        user: '$_id_str',
                        host: requesterId
                    },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $and: [
                                        {
                                            $eq: ['$$host', '$to']
                                        },
                                        {
                                            $eq: ['$$user', '$from']
                                        }
                                    ]
                                }
                            }
                        }
                    ],
                    as: 'receivedRequest'
                }
            },
            {
                $set: {
                    profilePic: '$profilePhotos.imageURL',
                    friendStatus: {
                        $switch: {
                            branches: [
                                {case: {$eq: [requesterId, '$_id_str']}, then: 0},
                                {case: {$eq: [{$size: '$isFriend'}, 1]}, then: 1},
                                {case: {$eq: [{$size: '$sentRequest'}, 1]}, then: 2},
                                {case: {$eq: [{$size: '$receivedRequest'}, 1]}, then: 3}
                            ],
                            default: 4
                        }
                    }
                }
            },
            {
                $unset: ['profilePhotos', 'isFriend', 'sentRequest', 'receivedRequest']
            },
            {
                $sort: {
                    friendStatus: 1
                }
            },
            {
                $skip: 10 * page
            },
            {
                $limit: 10
            }
        ]);

        console.log(likeUsersArray);

        return res.json({status: 'ok', msg: likeUsersArray});
    }
    catch(err) {
        console.log(err);
        return res.json({status: 'ok', msg: err.message});
    }

}

module.exports = {
    postAdd,
    postLikeAdd,
    postLikeRemove,
    getProfileFeed,
    getPostLikes
}