const schema = require('../../validations/state.validator');
const stateService = require('../../services/state.service');

const stateController = {};

stateController.add = async (req, res) => {
  const data = await schema.validateAsync(req.body);
  try {
    let result = await stateService.add(data);
    if (data) {
      result = {
        success: 1,
        message: 'user created succsesfully',
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

stateController.getById = async (req, res) => {
  const stateId = req.params.id;
  try {
    let result = await stateService.getById(stateId);
    res.status(200).json({
      success: 1,
      message: 'state detail fetch scuuessfully',
    });
    console.log(result);
  } catch (err) {
    result = {
      success: 0,
      message: err.message,
    };
  }
};

stateController.update = async (req, res) => {
  const stateId = req.params.id;
  try {
    const data = await schema.validateAsync(req.body);

    const result = await stateService.update(stateId, data);
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

stateController.deleted = async (req, res) => {
  const stateId = req.params.id;
  try {
    let result = await stateService.deleted(stateId);
    res.status(200).json({
      success: 1,
      message: 'state deleted scuuessfully',
    });
    console.log(result);
  } catch (err) {
    result = {
      success: 0,
      message: err.message,
    };
  }
};

stateController.list = async (req, res) => {
  try {
    let result = await stateService.list();
    res.status(200).json({
      success: 1,
      message: 'state list fetch scuuessfully',
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

module.exports = stateController;
