const routes = require('express').Router();
const syncBook = require('./syncbook');
const emailClient = require('./emailClient');

routes.get('/', (req, res) => {
  res.sendFile('../doc/index/html');
});

routes.use('/api/v1/sync-book', syncBook);

routes.use('/api/v1/emailClient', emailClient);

module.exports = routes;
