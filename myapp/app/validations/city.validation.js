const Joi = require('joi');

const schema = Joi.object({
  name: Joi.string().alphanum().min(2).max(30).required(),
  city_code: Joi.string().required(),
  status: Joi.string().required(),
});

module.exports = schema;
