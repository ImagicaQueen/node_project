const Joi = require('joi');

const schema = Joi.object({
  name: Joi.string().alphanum().min(2).max(30).required(),
  country_code: Joi.string(),
  status: Joi.string().required(),
});

module.exports = schema;
