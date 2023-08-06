const express = require('express');
const router = express.Router();
const productController = require('./product.controller');

router.post('/order/products_add', productController.add);

module.exports = router;
