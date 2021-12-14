const messageRouter = require('express').Router();

const jwtAuth = require('../Middlewares/jwtAuth.js');
const { addMessage, getMessages } = require('../Controllers/MessageController.js');

messageRouter.post('/add', jwtAuth, addMessage);
messageRouter.post('/get', jwtAuth, getMessages);

module.exports = messageRouter;