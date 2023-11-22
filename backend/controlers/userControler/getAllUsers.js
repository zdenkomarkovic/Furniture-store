const UserModel = require('../../model/userModel');

const getAllUsers = (req, res) => {
  UserModel.find({})
    .then(users => res.send(users))
    .catch(err => res.send(err));
};
module.exports = getAllUsers;
