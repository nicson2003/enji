const express = require('express');

const apiRouter = express();

apiRouter.use('/user', require('./userRestApi'));

module.exports = apiRouter;
