const userRouter = require('express').Router();
const postRouter = require('./PostRouter.js');

const authentication = require('../Middlewares/Authenticaion.js');
const userSearchAuth = require('../Middlewares/userSearchAuth.js');
const jwtAuth = require('../Middlewares/jwtAuth.js');

const { userRegister, userLogin } = require('../Controllers/AuthController.js');
const { getUser, searchUser } = require('../Controllers/UserController.js');
const { friendAddRequest, friendCancelRequest } = require('../Controllers/FriendController.js');



userRouter.use('/posts', postRouter);

userRouter.post('/register', authentication, userRegister);
userRouter.post('/login', userLogin);
userRouter.post('/getUser', jwtAuth, getUser);
userRouter.post('/search', userSearchAuth,  searchUser);
userRouter.post('/friends/request/add', jwtAuth, friendAddRequest);
userRouter.post('/friends/request/cancel', jwtAuth, friendCancelRequest);

module.exports = userRouter;