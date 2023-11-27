const UserModel = require('../../model/userModel');

const getUser = (req, res) => {
  console.log(req.headers);

  UserModel.findOne({ email: req.params.email })
    .then(user => res.send(user))
    .catch(err => res.send(err));
};

module.exports = getUser;
