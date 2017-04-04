require('dotenv').config({ silent: true });
const express = require('express');
const bodyParser = require('body-parser');

const routes = require('./routes');
const Logger = require('./tracer');

const app = express();
const PORT = process.env.PORT || 6000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/', routes);

// catch unknown routes
app.use((req, res, next) => {
  res.status(404).json({
    error: 'Requested route does not exist yet. Check back later. :wink:'
  });
});

app.use((err, req, res, next) => {
  Logger.error(`error: ${err.message}`);
  res.status(err.code || 500).json({ error: err.reason || 'Unknown error.' });
});

app.listen(PORT, (err) => {
  if (!err) {
    Logger.info(`API server started on port ${PORT}`);
  }
});
