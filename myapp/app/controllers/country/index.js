const express = require('express');
const router = express.Router();
const countryController = require('./country.controller');

router.post('/add', countryController.add);
router.get('/get/:id?', countryController.getById);
router.put('/:id', countryController.update);
router.delete('/:id', countryController.deleted);
router.get('/list', countryController.list);

module.exports = router;
