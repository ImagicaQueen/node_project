const express = require('express');
const router = express.Router();
const cityController = require('./city.controller');

router.post('/add', cityController.add);
router.get('/get/:id', cityController.getById);
router.put('/:id', cityController.update);
router.delete('/:id', cityController.deleted);
router.get('/list', cityController.list);

module.exports = router;
