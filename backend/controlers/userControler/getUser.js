const UserModel = require('../../model/userModel');

const getUser = (req, res) => {
  UserModel.findOne({ name: req.params.name })
    .then(user => res.send(user))
    .catch(err => res.send(err));
};

module.exports = getUser;
