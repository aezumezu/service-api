const emailClient = require('express').Router();
const emailController = require('../controllers').emailController;

/**
 * @api {POST} /api/v1/emailClient/send Send Email
 *
 * @apiName Send Email
 * @apiGroup Email Client
 *
 * @apiDescription Send email message to me.
 *
 * @apiParamExample {json} POST Request-Example:
 {
   "email": "Email of the sender",
   "subject": "Subject of the email",
   "message": "The message you want to send".
 }
 *
 * @apiSuccess {Object} response JSON Object
 * @apiError {Object} error JSON Object with error message
 *
 *
 * @apiSuccessExample {json} Success-Response:
  {
    "success": "Message sent successfully"
  }
 *
 * @apiErrorExample {json} Error-Response:
 {
  "error": "There was an error sending mail. please try aagain later.
  Or email me directly at chukwuma.ezumezu@gmail.com"
 }
**/
emailClient.post('/send', (req, res, next) => {
  emailController.sendEmail(req, res, next);
});

module.exports = emailClient;
