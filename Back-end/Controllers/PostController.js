const upload = require('../Utils/Multer.js');
const cloudinary = require('../Utils/Cloudinary.js');

const Post = require('../Models/PostModel.js');
const Image = require('../Models/ImageModel.js');

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

module.exports = {
    postAdd,
    postLikeAdd,
    postLikeRemove,
    getProfileFeed
}