const express = require('express');
const router = express.Router();
const zoneshippingcostController = require('./zoneshippingcost.controller');

router.get('/zone/:id', zoneshippingcostController.list);

module.exports = router;
