const syncBook = require('express').Router();
const bookController = require('../controllers').syncBook;

/**
 * @api {GET} /api/v1/sync-book List Books
 *
 * @apiName GetBooks
 * @apiGroup SyncBook
 *
 * @apiDescription Get All books
 *
 * @apiSuccess {Object} response
 * @apiError {Object} response
 *
 * @apiSuccessExample {json} Success-Response:
  {
    "books": [
      {
        "ratings": "4.30",
        "imageUrl": "/image/path/50shadesgrey.jpg",
        "datePublished": "Tue Apr 03 2012",
        "author": "E. L. James",
        "title": "Fifty Shades of Grey",
        "_id": "58e44447354ee62f72f7321d"
      },
      {
        "ratings": "4.10",
        "imageUrl": "/image/path/hunger_games1.jpg",
        "datePublished": "Sat Jul 03 2010",
        "author": "Suzanne Collins",
        "title": "The Hunger Games (Book 1)",
        "_id": "58e44447354ee62f72f7321e"
      }
    ]
  }
 *
 * @apiErrorExample {json} Error-Response:
 {
  "error": "message"
 }
**/
syncBook.get('/', (req, res, next) => {
  bookController.getBooks(req, res, next);
});

/**
 * @api {GET} /api/v1/sync-book/:id Book Details
 *
 * @apiName GetBook
 * @apiGroup SyncBook
 *
 * @apiParam {string} id Book ID.
 *
 * @apiDescription Get book details object using id
 *
 * @apiSuccess {Object} response
 * @apiError {Object} response
 *
 *
 *
 * @apiSuccessExample {json} Success-Response:
  {
    "book": {
      "ratings": "4.63",
      "description": "In one devastating night, violin prodigy Etta Spencer loses ",
      "imageUrl": "/image/path/passenger.jpg",
      "datePublished": "Tue Dec 06 2016",
      "author": "Alexandra Bracken",
      "title": "Passenger",
      "_id": "58e44447354ee62f72f7322d"
    }
  }
 *
 * @apiErrorExample {json} Error-Response:
 {
  "error": "message"
 }
**/
syncBook.get('/:id', (req, res, next) => {
  bookController.getBook(req, res, next);
});

/**
 * @api {POST} /api/v1/sync-book Add Rating
 *
 * @apiName Add Rating
 * @apiGroup SyncBook
 *
 * @apiDescription Add new rating for a book
 *
 * @apiParamExample {json} POST Request-Example:
 {
   "rating": "4.5",
 }
 *
 * @apiSuccess {Object} response JSON Object
 * @apiError {Object} error JSON Object with error message
 *
 *
 * @apiSuccessExample {json} Success-Response:
  {
    "book": {
      "ratings": "4.63",
      "description": "In one devastating night, violin prodigy Etta Spencer loses ",
      "imageUrl": "/image/path/passenger.jpg",
      "datePublished": "Tue Dec 06 2016",
      "author": "Alexandra Bracken",
      "title": "Passenger",
      "_id": "58e44447354ee62f72f7322d"
    }
  }
 *
 * @apiErrorExample {json} Error-Response:
 {
  "error": "message"
 }
**/
syncBook.post('/:id/rating', (req, res, next) => {
  bookController.addRating(req, res, next);
});

module.exports = syncBook;
