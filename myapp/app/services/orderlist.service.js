const db = require('../config/database');

const orderlistService = {};

orderlistService.list = async (keyword, offset, limit) => {
  let data = db('orders as o')
    .leftJoin('order_status_history AS osh', function () {
      this.on('osh.iOrderId', '=', 'o.iOrderId').andOn(
        'osh.vOrderStatus',
        '=',
        db.raw('?', ['Accepted'])
      );
    })
    .join('orders_products as op', 'o.iOrderId', '=', 'op.iOrderId')
    .join('orders_users AS ou', 'o.iOrderId', '=', 'ou.iOrderId')
    .join('mod_country as mc', 'mc.iCountryId', '=', 'ou.iShippingCountry');
  // console.log(data);

  // .where('osh.vOrderStatus', '=', 'Accepted');
  // .where('op.vName', 'like', keyword%');

  // console.log(data);

  data = data.count({ num: '*' });
  // console.log(data);
  const count = await data.select();
  console.log(count);

  if (keyword) {
    data = data.whereLike('op.vName', keyword);
    // console.log(data);
  }
  if (count && count.length && count[0].num > 0) {
    data.clearSelect();
    data = await data
      .select(
        db.raw('UNIX_TIMESTAMP(o.dtAddedDate) * 1000 as orderDate'),
        db.raw('UNIX_TIMESTAMP(osh.dtAddedDate) * 1000 as orderStatusDate'),
        'op.iOrderId as orderId',
        'o.vOrderNumber as orderNumber',
        'o.iTotalProductCount as totalProductCount',
        'o.vTrackingNumber as trackingNumber',
        'ou.vFullName as userName',
        'op.vName as productName',
        'op.iProductId as productId',
        'op.vDimensions as dimensions ',
        'op.dWeight as weight',
        'op.vProductCode as productCode',
        'mc.vcountry as shippingCountry',
        'o.iTotalItemCount as orderTotal',
        'osh.vOrderStatus as currentStatusCode',
        'o.iTotalItemCount as noOfItems',
        'osh.vOrderStatus as orderStatus'
      )

      .offset(offset)
      .limit(limit);

    return { data, count: count && count.length ? count : [] };
    // console.log(typeof data);
  } else {
    return {
      succsess: 0,
      message: 'data not found',
    };
  }
};

module.exports = orderlistService;
