const userRouter = require('express').Router();
const postRouter = require('./PostRouter.js');
const friendRouter = require('./FriendRouter.js');

const authentication = require('../Middlewares/Authenticaion.js');
const userSearchAuth = require('../Middlewares/userSearchAuth.js');
const jwtAuth = require('../Middlewares/jwtAuth.js');

const { userRegister, userLogin } = require('../Controllers/AuthController.js');
const { getUser, searchUser } = require('../Controllers/UserController.js');



userRouter.use('/posts', postRouter);
userRouter.use('/friends', friendRouter);

userRouter.post('/register', authentication, userRegister);
userRouter.post('/login', userLogin);
userRouter.post('/getUser', jwtAuth, getUser);
userRouter.post('/search', userSearchAuth,  searchUser);

module.exports = userRouter;