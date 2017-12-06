const sendgrid = require('sendgrid');
const Logger = require('../tracer');

/**
 *
 */
class EmailController {
  /**
   * @param {object} req
   * @param {object} res
   * @param {object} next
   * @returns {object} book
 */
  sendEmail(req, res, next) {
    const helper = sendgrid.mail;
    const sg = sendgrid(process.env.SENDGRID_API_KEY);
    const { email, subject, message } = req.body;
    const from = new helper.Email(email);
    const to = new helper.Email('chukwuma.ezumezu@gmail.com');

    const content = new helper.Content('text/html', message);
    const mail = new helper.Mail(from, subject, to, content);
    const request = sg.emptyRequest({
      method: 'POST',
      path: '/v3/mail/send',
      body: mail.toJSON()
    });

    sg.API(request, (err, reponse) => {
      if (err) {
        Logger.error(`Error: ${err.response.body.errors}`);
        return res.send({ error: 'There was an error sending mail. please try aagain later. Or email me directly at chukwuma.ezumezu@gmail.com' });
      }
      return res.send({ success: 'Email sent successfully' });
    });
  }
}
module.exports = new EmailController();
