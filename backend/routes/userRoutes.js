const express = require('express');
const router = express.Router();
const UserModel = require('../model/userModel');

const verifyToken = (req, res, next) => {
  if (req.headers.authorization) {
    next();
  } else {
    res.status(201).send({ msg: 'You are not logged' });
  }
};

router.get('/addUser', require('../controlers/userControler/addUser'));
router.get('/allUsers', require('../controlers/userControler/getAllUsers'));
router.get(
  '/:email',
  verifyToken,
  require('../controlers/userControler/getUser')
);

router.post('/register', require('../controlers/userControler/register'));
router.post('/login', require('../controlers/userControler/login'));

router.put(
  '/activate/:id',
  require('../controlers/userControler/activateAccount')
);

module.exports = router;
