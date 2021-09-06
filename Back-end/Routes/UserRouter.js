const userRouter = require('express').Router();
const postRouter = require('./PostRouter.js');

const authentication = require('../Middlewares/Authenticaion.js');
const { userRegister, userLogin } = require('../Controllers/AuthController.js');
const { getUser } = require('../Controllers/UserController.js');

userRouter.use('/post', postRouter);

userRouter.post('/register', authentication, userRegister);
userRouter.post('/login', userLogin);
userRouter.post('/getUser', getUser)

module.exports = userRouter;