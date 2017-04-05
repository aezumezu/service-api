const mongoose = require('mongoose');

module.exports = mongoose.model('SyncBooks', {
  title: {
    type: String
  },
  author: {
    type: String
  },
  ratings: {
    type: Array
  },
  datePublished: {
    type: Date
  },
  imageUrl: {
    type: String
  },
  description: {
    type: String
  }
});
