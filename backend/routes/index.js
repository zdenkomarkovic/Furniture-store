const express = require('express');
const router = express.Router();

router.use('/user', require('./userRoutes'));
router.use('/contact', require('./contactRoutes'));
router.use('/product', require('./productRoutes'));
router.use('/order', require('./orderRoutes'));

module.exports = router;
