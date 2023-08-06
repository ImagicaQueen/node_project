const reportlistingService = require('../../services/reportlisting.service');
const result = require('../../utility/utility');

const reportlistingController = {};

reportlistingController.list = async (req, res) => {
  let response;
  try {
    const querydata = req.body;
    let limit=req.body.limit;
    let page=req.body.page;
    let condi = req.params.id;
    console.log(condi)
    console.log('querydata------------------------->', querydata);
    // console.log(req.params.id);
    const offset = (page - 1) *limit;
    // console.log(querydata.page);
    const getData = await reportlistingService.list(
      offset,
      querydata,
      limit,
      condi
    );
    console.log(offset);

    response = result(
      'list',
      1,
      'Report list found.',
      200,
      getData.data,
      getData.count[0].num,
      offset,
      limit,
      page,
      page - 1,
      page + 1
    );
  } catch (err) {
    response = result('', 0, err.message);
  }
  res.send(response);
};

module.exports = reportlistingController;
