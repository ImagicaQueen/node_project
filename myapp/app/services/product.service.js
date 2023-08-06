const { randomUUID } = require('crypto');
const db = require('../config/database');

const productService = {};

productService.add = async (data) => {
  try {
    const cloneData = {
      iUserId: data.iUserId,
      vProductName: data.productName,
      vProductCode: randomUUID(),
      tShortDescription: data.shortDescription,
      dLength: data.length,
      dWidth: data.width,
      dHeight: data.height,
      dWeight: data.weight,
      eStatus: data.status,
      dUnitPrice: data.unitPrice,
      vHscode: data.hsCode,
      vSkU: data.sku,
      tProductComposition: data.productComposition,
      iCountryId: data.countryId,
      eIsStockManage: data.isStock,
      iAvailableStock: data.availableStock,
      iStockAlertQuantity: data.stockAlertQuantity,
      dCompareAt: data.compareAt,
      eProductCondition: data.productCondition,
      vBarcode: data.barcode,
      vPageTitle: data.pageTitle,
      tMetaDescription: data.metaDescription,
      tProductDescription: data.productDescription,
      tProductSpecification: data.productSpecification,
      tAdditionalInformation: data.additionalInformation,
    };

    const cloneDocument = [];

    const documents = [
      'appletokri-1680505343425.jpeg',
      'bottel-1680505346098.jpeg',
      'apple-1680505350161.jpeg',
    ];
    documents.forEach((el) => {
      cloneDocument.push({
        iProductId: el.productsId,
        vName: el.productName,
      });
    });
    // console.log(dtAddedDate);
    const response = await db('products').insert(cloneData);
    console.log(response);
  } catch (error) {
    console.log(error);
  }
};

// productService.list = async () => {
//   // const query = db('products as p')
//   //   .leftJoin('product_stock as ps', 'iUserId', '=', 'ps.iUserId')
//   //   .leftJoin(
//   //     'products_documents as pd',
//   //     'ps.iProductId',
//   //     '=',
//   //     'pd.iProductId'
//   //   );
// };

// const data = await query.select('p.iUserId as Id');
module.exports = productService;
