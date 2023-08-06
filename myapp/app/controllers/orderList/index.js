const express = require('express');
const router = express.Router();
const orderlistController = require('./orderlist.controller');

router.post('/orderlist', orderlistController.list);

module.exports = router;
