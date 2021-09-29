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

        console.log(result.likes);

        return res.json({status: 'ok'});
    } catch(err) {
        return res.json({status: 'error', msg: err.message});
    }
}

module.exports = {
    postAdd,
    postLikeAdd,
    postLikeRemove
}