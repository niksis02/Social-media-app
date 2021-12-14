const friendRouter = require('express').Router();

const jwtAuth = require('../Middlewares/jwtAuth.js');
const { 
    friendAddRequest, 
    friendCancelRequest,
    friendDeleteRequest,
    friendConfirmRequest,
    friendDelete,
    friendGetOnlineOnes
} = require('../Controllers/FriendController.js');

friendRouter.post('/get/online', jwtAuth, friendGetOnlineOnes);
friendRouter.post('/request/add', jwtAuth, friendAddRequest);
friendRouter.post('/request/cancel', jwtAuth, friendCancelRequest);
friendRouter.post('/request/delete', jwtAuth, friendDeleteRequest);
friendRouter.post('/request/confirm', jwtAuth, friendConfirmRequest);
friendRouter.post('/delete', jwtAuth, friendDelete);

module.exports = friendRouter;