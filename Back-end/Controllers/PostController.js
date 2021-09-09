const upload = require('../Utils/Multer.js');
const cloudinary = require('../Utils/Cloudinary.js');

const Post = require('../Models/PostModel.js');
const Image = require('../Models/ImageModel.js');

const postAdd = async (req, res) => {
    try {
        const now = new Date();
        const date = now.getMonth() + '-' + now.getFullYear();

        const post = {
            userId: res.locals.id,
            content: req.body.content,
            date
        }
        const newPost = await Post.create(post);

        const result = await cloudinary.uploader.upload(req.file.path);
        const newImage = await Image.create({
            userId: res.locals.id,
            postId: newPost.id,
            imageURL: result.secure_url
        });
        return res.json({status: 'ok'});
    } 
    catch(err) {
        return res.json({status: 'error', msg: err.message});
    }
}

module.exports = {
    postAdd
}