// const countryService = require('../../services/country.service');
const orderlistService = require('../../services/orderlist.service');
const result = require('../../utility/utility');
const orderlistController = {};

orderlistController.list = async (req, res) => {
  let response;
  try {
    const querydata = req.body;
    const keyword = req.body.keyword;
    // console.log(keyword);
    const offset = (querydata.page - 1) * querydata.limit;
    const getData = await orderlistService.list(
      querydata.keyword,
      offset,
      querydata.limit
    );

    // console.log(getData);
    response = result(
      'list',
      1,
      'fetched succesfully',
      200,
      getData.data,
      getData.count[0].num,
      offset,
      querydata.limit,
      querydata.page,
      querydata.page - 1,
      querydata.page + 1
    );
    // console.log(getData);
  } catch (err) {
    response = result('', 0, err.message);
  }
  res.send(response);
};

module.exports = orderlistController;
