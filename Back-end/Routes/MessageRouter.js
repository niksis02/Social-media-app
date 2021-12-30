const messageRouter = require('express').Router();

const jwtAuth = require('../Middlewares/jwtAuth.js');
const { addMessage, getMessages, getChats } = require('../Controllers/MessageController.js');

messageRouter.post('/add', jwtAuth, addMessage);
messageRouter.post('/get', jwtAuth, getMessages);
messageRouter.post('/get/chats', jwtAuth, getChats);

module.exports = messageRouter;