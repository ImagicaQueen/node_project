const customService = require('../../services/custom.service');

const customController = {};

customController.add = async (req, res) => {
    const data = req.body;
    try {
      let result = await customService.add(data);
      if (result) {
        result = {
          success: 1,
          message: 'user created succsesfully',
          data: result,
        };
      }
    } catch (err) {
      result = {
        success: 0,
        message: err.message,
      };
    }
    res.send();
  };
module.exports=customController;

