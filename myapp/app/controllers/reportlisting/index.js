const express = require('express');
const router = express.Router();
const reportlistingController = require('./reportlisting.controller');

router.post('/reports/listing/:id', reportlistingController.list);

module.exports = router;
