const express = require('express');
// const cityController = require('./controllers/city/city.controller');
const router = express.Router();
const countryRoutes = require('./controllers/country');
const stateRoutes = require('./controllers/state');
const cityRoutes = require('./controllers/city');
const userRoutes = require('./controllers/user');
const orderlistRoutes = require('./controllers/orderList');
const zoneshippingcostRoutes = require('./controllers/zoneshippingcost');
const reportlistingRoutes = require('./controllers/reportlisting');
const productRoutes = require('./controllers/product');
const customRoutes = require('./controllers/custom')

router.use('/country', countryRoutes);
router.use('/state', stateRoutes);
router.use('/city', cityRoutes);
router.use('/user', userRoutes);
router.use('/api', orderlistRoutes);
router.use('/zone-shipping-cost', zoneshippingcostRoutes);
router.use('/apii', reportlistingRoutes);
router.use('/ap', productRoutes);
router.use('/custom', customRoutes);


module.exports = router;
