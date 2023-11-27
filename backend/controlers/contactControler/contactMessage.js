const ContactModel = require('../../model/contactModel');

const contactMessage = (req, res) => {
  const { name, email, message } = req.body;

  const contactMessage = { name, email, message };

  const newMessage = new ContactModel(contactMessage);

  newMessage
    .save()
    .then(savedMessage => {
      console.log(savedMessage);
      res.status(200).json({
        success: true,
        message: 'Contact message saved successfully.',
      });
    })
    .catch(err => {
      console.log(err);
      res
        .status(500)
        .json({ success: false, message: 'Error saving contact message.' });
    });
};

module.exports = contactMessage;
