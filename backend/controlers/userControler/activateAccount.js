const UserModel = require('../../model/userModel');

const activateAccount = (req, res) => {
  UserModel.updateOne({ _id: req.params.id }, { isActivated: true })
    .then(value => {
      res.send();
    })
    .catch(err => {
      res.status(415).send(err);
    });
};

module.exports = activateAccount;
