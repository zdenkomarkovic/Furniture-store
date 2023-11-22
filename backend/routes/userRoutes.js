const express = require('express');
const router = express.Router();
const UserModel = require('../model/userModel');

router.get('/addUser', require('../controlers/userControler/addUser'));
router.get('/allUsers', require('../controlers/userControler/getAllUsers'));
router.get('/:name', require('../controlers/userControler/getUser'));

router.post('/register', require('../controlers/userControler/register'));

module.exports = router;
