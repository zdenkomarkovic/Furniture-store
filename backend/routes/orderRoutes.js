const express = require('express');
const router = express.Router();

router.post('/addOrder', require('../controlers/orderControler/addOrder'));
router.get('/allOrders', require('../controlers/orderControler/allOrders'));
module.exports = router;
