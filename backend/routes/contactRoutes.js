const express = require('express');
const router = express.Router();

router.post('/', require('../controlers/contactControler/contactMessage'));
module.exports = router;
