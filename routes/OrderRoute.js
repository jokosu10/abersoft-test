const express = require("express");
const router = express();

const OrderRoute = require('../controllers/OrderController');

router.post('/orders', OrderRoute.postOrder);
router.get('/orders', OrderRoute.getOrder);

module.exports = router;