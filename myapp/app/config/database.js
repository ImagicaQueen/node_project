const knex = require('knex');

const db = knex({
  client: process.env.DB_CLIENT,
  connection: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
  },
  log: {
    warn(message) {},
    error(message) {
      console.log(error);
    },
    deprecate(message) {},
    debug(message) {},
  },
});
module.exports = db;
