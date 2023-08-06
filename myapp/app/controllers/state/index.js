const express = require('express');
const router = express.Router();
const stateController = require('./state.controller');
const auth = require('../../middlewares/auth');
router.post('/add', stateController.add);
router.get('/get/:id', stateController.getById);
router.put('/:id', stateController.update);
router.delete('/:id', stateController.deleted);
router.get('/list', stateController.list);

module.exports = router;
