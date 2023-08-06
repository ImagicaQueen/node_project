const schema = require('../../validations/city.validation');
const cityService = require('../../services/city.service');
const cityController = {};

cityController.add = async (req, res) => {
  const data = await schema.validateAsync(req.body);
  try {
    let result = await cityService.add(data);
    if (data) {
      result = {
        success: 1,
        message: 'city created succsesfully',
        data: result,
      };
    }
    console.log(result);
  } catch (err) {
    result = {
      success: 0,
      message: err.message,
    };
  }
  res.send();
};

cityController.getById = async (req, res) => {
  const cityId = req.params.id;
  try {
    let result = await cityService.getById(cityId);
    res.status(200).json({
      success: 1,
      message: 'country detail fetch scuuessfully',
      data: result,
    });
    console.log(result);
  } catch (err) {
    result = {
      success: 0,
      message: err.message,
    };
  }
};

cityController.update = async (req, res) => {
  const cityId = req.params.id;
  try {
    const data = await schema.validateAsync(req.body);

    const result = await cityService.update(cityId, data);
    res.status(200).json({
      sucsses: 1,
      message: 'data updated succesfully',
    });
  } catch (err) {
    res.status(500).json({
      sucsses: 0,
      message: err.message || 'somthing went wrong',
    });
  }
  res.send();
};

cityController.deleted = async (req, res) => {
  const cityId = req.params.id;
  try {
    let result = await cityService.deleted(cityId);
    res.status(200).json({
      success: 1,
      message: 'city deleted scuuessfully',
    });
    console.log(result);
  } catch (err) {
    result = {
      success: 0,
      message: err.message,
    };
  }
};

cityController.list = async (req, res) => {
  try {
    let result = await cityService.list();
    console.log(result);
    res.status(200).json({
      success: 1,
      message: 'city listing successfully',
      data: result,
    });
    // console.log(result);
    res.send(result);
  } catch (err) {
    let result = {
      success: 0,
      message: err.message,
    };
    res.send(result);
  }
};

module.exports = cityController;
