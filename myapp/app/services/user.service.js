const db = require('../config/database');

const userService = {};

userService.signup = async (userData) => {
  const hashPwd = await db('user').insert(userData);
  return hashPwd;
};

userService.login = async (data) => {
  const results = await db('user').select().where({ email: data });
  return results;
};

userService.fileupload = async (file, id) => {
  console.log(file);
  console.log(id);
  await db('user').where('user_id', '=', id).update({
    profile: file,
  });
};

userService.multer = async (file, id) => {
  await db('user').where('user_id', '=', id).update({
    profile: file,
  });
};
module.exports = userService;
