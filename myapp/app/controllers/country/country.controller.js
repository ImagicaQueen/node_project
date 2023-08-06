const schema = require('../../validations/country.validation');
const countryService = require('../../services/country.service');
const result = require('../../utility/utility');
const countryController = {};

countryController.add = async (req, res) => {
  const data = await schema.validateAsync(req.body);
  try {
    let result = await countryService.add(data);
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

countryController.getById = async (req, res) => {
  const countryId = req.params.id;
  try {
    let result = await countryService.getById(countryId);
    res.status(200).json({
      success: 1,
      message: 'country detail fetch succuessfully',
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

countryController.update = async (req, res) => {
  const countryId = req.params.id;
  try {
    const data = await schema.validateAsync(req.body);

    const result = await countryService.update(countryId, data);
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

countryController.deleted = async (req, res) => {
  const countryId = req.params.id;
  try {
    let result = await countryService.deleted(countryId);
    res.status(200).json({
      success: 1,
      message: 'country deleted scuuessfully',
    });
    console.log(result);
  } catch (err) {
    result = {
      success: 0,
      message: err.message,
    };
  }
};

countryController.list = async (req, res) => {
  try {
    const page = req.params;
    console.log(req.params);
    console.log(page);
    let result = await countryService.list();
    // console.log(result);
    res.status(200).json({
      success: 1,
      message: 'country listing successfully',
      result,
    });
    // console.log(result);
    // res.send(result);
  } catch (err) {
    let result = {
      success: 0,
      message: err.message,
    };
    res.send(result);
  }
};

countryController.list = async (req, res) => {
  try {
    const qdata = Number(req.query.page);
    const offset = (qdata - 1) * 5;
    const out = await countryService.list(offset);
console.log('out---------------------------->',qdata)
    const response = result(
      'list',
      1,
      'fetched succesfully',
      200,
      out.result,
      out.count[0].c,
      offset,
      5,
      qdata,
      qdata - 1,
      qdata + 1
    );
    res.send(response);
  } catch (err) {
    let result = {
      success: 0,
      message: err.message,
    };
    res.send(result);
  }
};
//this method use index.js bcz i imported

module.exports = countryController;
