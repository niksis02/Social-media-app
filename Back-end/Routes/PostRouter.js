const postRouter = require('express').Router();

postRouter.get('/add', (req, res) => {
    console.log('postRouter add route');
});

module.exports = postRouter;