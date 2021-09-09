const User = require('../Models/UserModel.js');
const Post = require('../Models/PostModel.js');


const getUser = async (req, res) => {
    const { id } = req.body;
    console.log(id);
    try {
        const user = await User.findById(id);
        const posts = await Post.find({userId: id});
        const publicInfo = {
            name: user.name,
            surname: user.surname,
            gender: user.gender,
            birth: user.birth,
            profilePhoto: user.profilePhoto,
            coverPhoto: user.coverPhoto,
            posts
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