const notifRouter = require('express').Router();

const { getNotifs, getNotifRealTime } = require('../Controllers/NotifController.js');
const jwtAuth = require('../Middlewares/jwtAuth.js');


notifRouter.post('/getAll', jwtAuth, getNotifs);
notifRouter.get('/getRealTime', jwtAuth, getNotifRealTime);


module.exports = notifRouter;