const db = require('../config/database');

const stateService = {};

stateService.add = async (stateData) => {
  const result = await db('state').insert(stateData);
  return result;
};

stateService.getById = async (stateId) => {
  const result = await db('state').where({ state_id: stateId });
  return result;
};

stateService.update = async (stateId, stateData) => {
  const result = await db('state')
    .where({ state_id: stateId })
    .update(stateData);
  return result;
};

stateService.deleted = async (stateId) => {
  await db('state').where({ state_id: stateId }).del();
};

stateService.list = async () => {
  const result = db('state').select();
  // console.log(result)

  return result;
};

module.exports = stateService;
