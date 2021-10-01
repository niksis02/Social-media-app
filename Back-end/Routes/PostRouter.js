const postRouter = require('express').Router();
const upload = require('../Utils/Multer.js');

const jwtAuth = require('../Middlewares/jwtAuth.js');
const {
    postAdd,
    postLikeAdd,
    postLikeRemove,
    getProfileFeed
} = require('../Controllers/PostController.js');

postRouter.post('/add', upload.single('image'), jwtAuth, postAdd);
postRouter.put('/likes/add', jwtAuth, postLikeAdd);
postRouter.put('/likes/remove', jwtAuth, postLikeRemove);
postRouter.post('/getProfileFeed', getProfileFeed);

module.exports = postRouter;