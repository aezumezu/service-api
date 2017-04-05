const syncBook = require('express').Router();
const bookController = require('../controllers').syncBook;

syncBook.get('/', (req, res, next) => {
  bookController.getBooks(req, res, next);
});

syncBook.get('/:id', (req, res, next) => {
  bookController.getBook(req, res, next);
});

syncBook.post('/:id/rating', (req, res, next) => {
  bookController.addRating(req, res, next);
});

module.exports = syncBook;
