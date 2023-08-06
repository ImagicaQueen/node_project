const zoneshippingcostService = require('../../services/zoneshippingcost.service');
const result = require('../../utility/utility');

const zoneshippingcostController = {};

zoneshippingcostController.list = async (req, res) => {
  const zoneId = req.params.id;
  let responseData = [];

  let prices = [];
  let max = 3;
  let min = 0.0;
  let zoneIds = [];
  let existZone = [];
  try {
    let zonedata = await zoneshippingcostService.list(zoneId);
    // console.log(zonedata);
    if (zonedata && zonedata.success) {
      let { zones, data } = zonedata;
      // console.log(data);
      zones.forEach((el) => {
        zoneIds.push(el.zoneId);
        // console.log(el.zoneId);
      });
      for (let i = 0; i < max * 2; i++) {
        min = min + 0.5;
        data.forEach((el) => {
          if (el.volWeight === min) {
            console.log(el.volWeight);
            prices.push({
              zoneShippingCostId: el.iZoneShippingCostId,
              fromZoneId: el.fromZoneId,
              toZoneId: el.toZoneId,
              volWeight: min,
              shippingCost: el.shippingCost,
            });
          }
          existZone.push(el.toZoneId);
        });

        zoneIds.forEach((el) => {
          if (!existZone.includes(el)) {
            prices.push({
              zoneShippingCostId: 0,
              fromZoneId: zoneId,
              toZoneId: el,
              volWeight: min,
              shippingCost: 0,
            });
          }
        });

        responseData.push({
          minVolweight: min,
          zoneId: zoneId,
          prices,
        });
        prices = [];
      }

      const response = result(
        '',
        zonedata.success,
        zonedata.message,
        200,
        responseData
      );
      res.send(response);
    } else {
      const dataError = result(
        '',
        zonedata.success,
        zonedata.message,
        500,
        data
      );
      res.send(dataError);
    }
  } catch (err) {
    const data = result('', 0, err.message, 500);
    res.send(data);
  }
};

// let min = 0;
// let max = 3;
// // let emobject = {};
// let prices = [];
// let responseData = [];

// zoneshippingcostController.list = async (req, res) => {
//   const Id = Number(req.params.Id);

//   try {
//     const zonedata = await zoneshippingcostService.list(Id);
//     const responseData = [];
//     // && Array.isArray(zonedata)
//     if (zonedata && zonedata.success && zonedata.data.length) {
//       for (let i = 0; i < max * 2; i++) {
//         min = min + 0.5;
//         const item = zonedata.data[i];
//         console.log(zonedata.data);
//         let existingZone = null;
//         for (let j = 0; j < zonedata.data.length; j++) {
//           // if (responseData[j].ZoneId === item.volWeight)
//           if (zonedata[i] !== undefined && zonedata[i].iToZoneId === j + 1) {
//             if (existingZone) {
//               console.log('in if------->');
//               prices = [];
//               existingZone.prices.push({
//                 iZoneShippingCostId: item.iZoneShippingCostId,
//                 iFromZoneId: Id,
//                 iToZoneId: j + 1,
//                 dVolWeight: min,
//                 dShippingCost: item.dShippingCost,
//               });
//             }
//           } else {
//             responseData.push({
//               dVolWeight: min,
//               iFromZoneId: Id,
//               prices: [
//                 {
//                   iZoneShippingCostId: 0,
//                   iFromZoneId: Id,
//                   iToZoneId: j + 1,
//                   dVolWeight: min,
//                   dShippingCost: 0,
//                 },
//               ],
//             });
//           }
//         }
//       }

//       const data = result(
//         '',
//         1,
//         'zone data found successfully',
//         200,
//         responseData
//       );
//       res.send(data);
//     } else {
//       const dataError = result(
//         '',
//         zonedata.success,
//         zonedata.message,
//         500,
//         zonedata.data
//       );
//       res.send(dataError);
//     }
//   } catch (err) {
//     const data = result('', 0, err.message, 500);
//     res.send(data);
//   }
// };

module.exports = zoneshippingcostController;
