const User = require('../Models/UserModel.js');
const Post = require('../Models/PostModel.js');
const Image = require('../Models/ImageModel.js');


const getUser = async (req, res) => {
    const { id } = req.body;
    try {
        const user = await User.findById(id);
        const posts = await Post.find({userId: id});

        const postIds = posts.map(elem => elem.id);
        const images = await Image.find({ 'postId': { $in: postIds } });
        
        const publicInfo = {
            name: user.name,
            surname: user.surname,
            gender: user.gender,
            posts,
            images
        }
        return res.json({status: 'ok', msg: publicInfo});
    }
    catch(err) {
        return res.json({status: 'error', msg: err.message});
    }
}

module.exports = {
    getUser
};