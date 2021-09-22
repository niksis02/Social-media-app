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

const searchUser = async (req, res) => {
    const { regex, page } = res.locals;
    console.log(regex);

    const userList = await User.aggregate([
        {
            $project: {
                stringId: { '$toString': '$_id'},
                fullName : { $concat: ['$name', ' ', '$surname'] },
                name: '$name',
                surname: '$surname'
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
            $limit: 5
        },
        {
            $skip: page * 5
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