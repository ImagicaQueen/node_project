const db = require('../config/database');

const zoneshippingcostService = {};

zoneshippingcostService.list = async () => {
  const query = db('zone as z').leftJoin(
    'zone_shipping_cost as zsp',
    'z.iZoneId',
    'zsp.iToZoneId'
  );

  const zonedata = await query.select(
    'zsp.iFromZoneId as fromZoneId  ',
    'zsp.dVolWeight as volWeight',
    'zsp.iZoneShippingCostId as zoneShippingCostId',
    'zsp.iFromZoneId as fromZoneId',
    'zsp.iToZoneId as toZoneId',
    'zsp.dShippingCost as shippingCost'
  );
  // console.log(zonedata);
  if (zonedata && zonedata.length) {
    let zones = await db('zone').select('iZoneId as zoneId');
    return { zones, data: zonedata, success: 1, message: 'data found' };
  }

  return { zones: [], data: [], success: 0, message: 'data not found' };
};

module.exports = zoneshippingcostService;
