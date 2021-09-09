const postRouter = require('express').Router();
const upload = require('../Utils/Multer.js');

const jwtAuth = require('../Middlewares/jwtAuth.js');
const {
    postAdd
} = require('../Controllers/PostController.js');

postRouter.post('/add', upload.single('image'), jwtAuth, postAdd);

module.exports = postRouter;