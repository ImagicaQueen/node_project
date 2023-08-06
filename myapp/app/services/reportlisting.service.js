const db = require('../config/database');
const reportlistingService = {};

reportlistingService.list = async (offset, querydata, limit, condi) => {
  let check = [];
  let data = db('orders as o')
    .join('orders_users as ou', 'o.iOrderId', '=', 'ou.iOrderId')
    .leftJoin('mod_country as mc', 'o.iOrderId', '=', 'mc.iCountryId')
    .leftJoin('order_status_history as osh', 'o.iOrderId', '=', 'osh.iOrderId');
  // console.log(data);

  switch (condi) {
    case 'revenue': {
      check = [
        ...check,
        db.raw('UNIX_TIMESTAMP(o.dtAddedDate) * 1000 as orderDate'),
        db.raw('UNIX_TIMESTAMP(o.dPayoutDate) * 1000 as payoutDate'),
        'o.ePayoutStatus as payoutStatus',
        'o.iOrderId as orderId',
        'o.vOrderNumber as orderNumber',
        'o.vPlatformOrderNumber as platformOrderNumber',
        'ou.vFullName as customerName',
        'ou.vEmail as customerEmail',
        'mc.vCountry as shippingCountry',
        'o.dOrderTotalCustomer as customerTotal',
        'o.dProductCostSeller as sellerPayout',
      ];
    }
    break;
  case 'order': {
    check = [
      ...check,
      db.raw('UNIX_TIMESTAMP(o.dtAddedDate) * 1000 as orderDate'),
      db.raw('UNIX_TIMESTAMP(o.dPayoutDate) * 1000 as payoutDate'),
      'o.ePayoutStatus as payoutStatus',
      'o.iOrderId as orderId',
      'o.vOrderNumber as orderNumber',
      'o.vPlatformOrderNumber as platformOrderNumber',
      'ou.vFullName as customerName',
      'ou.vEmail as customerEmail',
      'mc.vCountry as shippingCountry',
      'o.vCurrentStatus as orderStatus',
      'o.dOrderSubTotal as itemSubTotal',
      'o.dDutyTaxes as dutyTaxes',
      'o.dShippingCost as shippingCharges',
      'o.dShippingCostAdmin as adminShippingCharges',
      'o.dHandlingCost as handlingCharges',
      'o.dPaymentGatewayFee as paymentFee',
      'o.vCouponCode as couponCode',
      'o.dNetPayable as customerTotal',
      'o.dCouponDiscount as discountAmount',
      'o.dProductCostSeller as sellerPayout,'
    ];
  }
  break;
  }


  // if (querydata === 'revenue') {
  data = data.count({
    num: '*'
  });
  const count = await data.select();
  data.clearSelect();
  if (count && count.length && count[0].num > 0) {
    // console.log(count);


    // console.log(data);
    data = await data
      .select(...check)
      .limit(limit)
      .offset(offset);

    return {
      data: {
        report: data
      },
      // data: { summary: data },
      count: count && count.length ? count : [],
    };
  } else {
    return {
      succsess: 0,
      message: 'data not found',
    };
  }
};
// };

module.exports = reportlistingService;