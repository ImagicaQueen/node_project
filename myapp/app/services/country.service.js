const db = require('../config/database');

const countryService = {};

//knew db name in bracket table name with insert pass data
countryService.add = async (countryData) => {
  const result = await db('country').insert(countryData);
  return result;
};

countryService.getById = async (countryId) => {
  const result = await db('country').where({ country_id: countryId });
  return result;
};

countryService.update = async (countryId, countryData) => {
  const result = await db('country')
    .where({ country_id: countryId })
    .update(countryData);
  return result;
};

countryService.deleted = async (countryId) => {
  await db('country').where({ country_id: countryId }).del();
};

// countryService.list = async (offset) => {
//   const result = db('country').select().limit('5').offset(offset);
//   return result;
// };

countryService.list = async (offset) => {
  const result = await db('country')
    .limit(5)
    .offset(offset)
    .count('country_code as c');


    console.log(result,"rs")

  const count = await db('country').count('country_code as c');
  return { count, result };
};

module.exports = countryService;
