const userRouter = require('express').Router();
const postRouter = require('./PostRouter.js');
const friendRouter = require('./FriendRouter.js');
const notifRouter = require('./NotifRouter.js');
const messageRouter = require('./MessageRouter.js');

const authentication = require('../Middlewares/Authenticaion.js');
const userSearchAuth = require('../Middlewares/userSearchAuth.js');
const jwtAuth = require('../Middlewares/jwtAuth.js');

const { userRegister, userLogin } = require('../Controllers/AuthController.js');
const { getProfile, searchUser, getUser, getFeed } = require('../Controllers/UserController.js');



userRouter.use('/posts', postRouter);
userRouter.use('/friends', friendRouter);
userRouter.use('/notifications', notifRouter);
userRouter.use('/messages', messageRouter);

userRouter.post('/register', authentication, userRegister);
userRouter.post('/login', userLogin);
userRouter.post('/profile', jwtAuth, getProfile);
userRouter.post('/search', userSearchAuth,  searchUser);
userRouter.get('/user', jwtAuth, getUser);
userRouter.post('/feed', jwtAuth, getFeed);

module.exports = userRouter;