const express = require('express');
const apiRouter = express.Router();

const sisterRouter = require('./sisterRouter'); 
const authSisterRouter = require('./authSisterRouter');

const parentRouter = require('./parentRouter');
const authParentRouter = require('./authParentRouter');


apiRouter.use('/', (req, res, next) => {
    console.log(req.session.parent);
    console.log(req.session.sister)
    next();
});

apiRouter.get('/', (req, res) => {
    res.send('Babyservice Server');
    console.log('123324')
});

apiRouter.use('/sisters', sisterRouter);
apiRouter.use('/sister', authSisterRouter);


apiRouter.use('/parents', parentRouter);
apiRouter.use('/parent', authParentRouter);


module.exports = apiRouter;