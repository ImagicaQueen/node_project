const productService = require('../../services/product.service');
const result = require('../../utility/utility');

const productController = {};

productController.add = async (req, res) => {
  let result;
  let data = req.body;
  console.log(data);
  try {
    result = await productService.add(data);

    // console.log('result-------->', result);
    if (result) {
      result = {
        success: 1,
        message: 'product added succsesfully',
        status: 200,
        data: result,
      };
    }
  } catch (err) {
    result = {
      success: 0,
      message: err.message,
    };
  }
  // console.log(result);
  res.send();
};

module.exports = productController;
