const express = require('express');
const router = express.Router();
const auth = require('../../middlewares/auth');
const { upload } = require('../../utility/utility');
const userController = require('./user.controller');

router.post('/signup', userController.signup);
router.post('/login', userController.login);
// router.post('/fileupload', auth(), userController.fileupload);
router.post(
  '/multer',
  auth(),
  // upload.single('user_file'),
  userController.multer
);

// router.post('/upload', userController.upload);

module.exports = router;
