const db = require('../config/database');

const cityService = {};

cityService.add = async (cityData) => {
  const result = await db('city').insert(cityData);
  return result;
};

cityService.getById = async (cityId) => {
  const result = await db('city').where({ city_id: cityId });
  return result;
};

cityService.update = async (cityId, cityData) => {
  const result = await db('city').where({ city_id: cityId }).update(cityData);
  return result;
};

cityService.deleted = async (cityId) => {
  await db('city').where({ city_id: cityId }).del();
};

cityService.list = async () => {
  const result = db('city').select();
  return result;
};
module.exports = cityService;
