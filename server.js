require('dotenv').config({ silent: true });
const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const Logger = require('./tracer');
const routes = require('./routes');

global.ROOTDIR = __dirname;
mongoose.Promise = require('bluebird');

mongoose.connect(process.env.MONGODB_URI);
const dbConnect = mongoose.connection;

dbConnect.on('error', (err) => {
  Logger.error(`Database connection error: ${err.message}`);
});

dbConnect.once('open', () => {
  Logger.info('Database connected...');
});


const app = express();
const PORT = process.env.PORT || 6000;

app.use(express.static('doc'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
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
