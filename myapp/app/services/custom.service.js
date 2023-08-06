const db = require('../config/database');
const customService = {};

customService.add = async (Data) => {
    const result = await db('custom_fields').insert(Data);
    return result;
  };
  


module.exports =customService;
