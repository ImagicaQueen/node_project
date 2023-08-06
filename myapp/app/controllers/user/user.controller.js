const express = require('express');

const schema = require('../../validations/user.validation.js');
const userService = require('../../services/user.service');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const result = require('../../utility/utility');

const router = express.Router();

const userController = {};

userController.signup = async (req, res) => {
  const data = req.body;
  let result;

  try {
    const password = await bcrypt.hash(data.password, 10);
    data.password = password;

    let result = await userService.signup(data);
    if (result) {
      result = {
        success: 1,
        message: 'user created succsesfully',
        data: password,
      };
    }
    // console.log(result);
  } catch (err) {
    result = {
      success: 0,
      message: err.message,
    };
  }
  res.send();
};

userController.login = async (req, res) => {
  const data = req.body;
  console.log(data);
  try {
    const [obj] = await userService.login(data.email);
    // console.log(obj);
    const hashpassword = obj.password;
    const userObj = {
      user_id: obj.user_id,
      name: obj.name,
      email: obj.email,
    };
    console.log(hashpassword);

    const varifypassword = await bcrypt.compare(data.password, hashpassword);

    if (varifypassword) {
      const token = await jwt.sign(userObj, process.env.JWT_SECRET);
      results = {
        ...userObj,
        token,
      };
    } else {
      console.log('user not found');
    }
  } catch (err) {
    results = {
      success: 0,
      message: err.message,
      data: {},
    };
  }
  res.send(results);
};

userController.multer = async (req, res) => {
  try {
    {
      console.log(req.user.user_id);
      const result = await userService.multer(
        req.file.originalname,
        req.user.user_id
      );
      console.log(result);

      if (result) {
      }

      file.mv('app/public/' + file.name, (err) => {
        if (err) {
          throw err;
        }
      });
    }
  } catch (err) {
    if (err) {
      throw err;
    }
  }
  res.json({
    success: 1,
    message: 'Profile updated successfully',
  });
};

module.exports = userController;
