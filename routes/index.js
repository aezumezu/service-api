const routes = require('express').Router();
const syncBook = require('./syncbook');

routes.get('/', (req, res) => {
  res.sendFile('../doc/index/html');
});

routes.use('/api/v1/sync-book', syncBook);

module.exports = routes;
