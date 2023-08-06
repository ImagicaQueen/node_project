const express = require('express');
const router = express.Router();
const customController = require('./custom.controller');


router.post('/add', customController.add);
// router.get('/get/:id?', countryController.getById);
// router.put('/:id', countryController.update);
// router.delete('/:id', countryController.deleted);
// router.get('/list', countryController.list);

module.exports = router;
