const UserModel = require('../../model/userModel');
const bcrypt = require('bcryptjs');
const { sendActivateLink } = require('../../services/sendMail');
const saltRound = 10;

const register = async (req, res) => {
  const { email, password } = req.body;
  const reqBody = req.body;

  const isExist = await UserModel.countDocuments({ email });
  if (isExist > 0) {
    res.status(201).send({ msg: 'Email already exists' });
  } else {
    const hashPasword = await bcrypt.hash(password, saltRound);

    let newUser = new UserModel({ ...reqBody, password: hashPasword });
    newUser
      .save()
      .then(user => {
        let verifyLink =
          'https://furniture-store-r4p8.vercel.app//activate/' + user._id;
        sendActivateLink(email, verifyLink)
          .then(data => {
            res.send({ msg: 'Registration successful' });
          })
          .catch(err => {
            res.status(201).send({ msg: 'Registration failed' });
          });
      })
      .catch(err => {
        res.status(415).send(err);
      });
  }
};
module.exports = register;
