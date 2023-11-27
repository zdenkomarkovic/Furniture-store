const nodemailer = require('nodemailer');
const { activationMailTemplate } = require('../mailTemplate/mailTemplate');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'furniturestoreregister@gmail.com',
    pass: 'mcwr kigt lxju dkeq',
  },
});

const sendActivateLink = (email, verifyLink) => {
  let message = {
    from: 'Furniture-Shop <furniturestoreregister@gmail.com>',
    to: email,
    subject: 'Activate account',
    html: activationMailTemplate(verifyLink),
  };

  return transporter.sendMail(message);
};

const resetPassword = () => {};

module.exports = { sendActivateLink };
