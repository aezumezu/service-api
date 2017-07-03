const mongoose = require('mongoose');
const models = require('../models');
const mean = require('../helpers').mean;
const Logger = require('../tracer');

/**
 *
 * @param {object} book
 * @returns {object} book
 */
function formatBook(book, baseUrl) {
  delete book.__v;
  book.ratings = mean(book.ratings).toFixed(2);
  book.datePublished = new Date(book.datePublished).toDateString();
  book.imageUrl = `${baseUrl}/images/syncbook/${book.imageUrl}`;
  return book;
}

/**
 * 
 */
class Syncbook {

  /**
   *
   * @param {Object} req
   * @param {Object} res
   * @param {Object} next
   *
   * @returns {Array}  books
   */
  getBooks(req, res, next) {
    const baseUrl = req.headers.host;
    models.SyncBooks.find()
      .then((books) => {
        res.status(200)
          .send({
            books: books.map((book) => {
              delete book._doc.description;
              return formatBook(book._doc, baseUrl);
            })
          });
      })
      .catch((err) => {
        Logger.error(`Error: ${err}`);
        res.send({ error: 'Book list not found.' });
      });
  }

  /**
   *
   * @param {object} req
   * @param {object} res
   * @param {object} next
   * @returns {object} book
   */
  getBook(req, res, next) {
    const baseUrl = req.headers.host;
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.send({});
    }
    models.SyncBooks.findById({ _id: req.params.id })
      .then((book) => {
        if (book) {
          book = formatBook(book._doc, baseUrl);
        }
        res.status(200)
          .send({ book: book || {} });
      }).catch((err) => {
        Logger.error(`Error: ${err}`);
        res.send({ error: 'Failed to get data.' });
      });
  }

  /**
   *
   * @param {object} req
   * @param {object} res
   * @param {object} next
   * @returns {object} book
   */
  addRating(req, res, next) {
    const id = req.params.id;
    const baseUrl = new URL(req.url).hostname;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.send({ error: 'Invalid id' });
    }
    models.SyncBooks.findById({ _id: id })
      .then((book) => {
        book._doc.ratings.push(parseFloat(req.body.rating));
        models.SyncBooks.findByIdAndUpdate(id, book, { new: true }, (err, updatedBook) => {
          return res.status(200)
            .send({ book: formatBook(updatedBook._doc, baseUrl) });
        });
      })
      .catch((err) => {
        res.send({ error: 'Add rating failed' });
      });
  }
}

module.exports = new Syncbook();
