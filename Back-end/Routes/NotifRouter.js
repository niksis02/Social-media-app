const notifRouter = require('express').Router();

const { getNotifs } = require('../Controllers/NotifController.js');
const jwtAuth = require('../Middlewares/jwtAuth.js');


notifRouter.get('/getAll', jwtAuth, getNotifs);


module.exports = notifRouter;