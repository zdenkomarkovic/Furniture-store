const UserModel = require('../../model/userModel');

const addUser = (req, res) => {
  let user = {
    name: '',

    password: '',
  };
  let newUser = new UserModel(user);
  newUser
    .save()
    .then(data => console.log(data))
    .catch(err => console.log(err));
  res.send('ok');
};

module.exports = addUser;
