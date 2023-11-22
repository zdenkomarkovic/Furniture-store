const register = (req, res) => {
  console.log(req.body);
  if (req.email) {
    res.send('ok');
  } else {
    res.status(205).send('Email is invalid');
  }
};
module.exports = register;
