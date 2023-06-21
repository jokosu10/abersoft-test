const express = require("express");
const router = express();

const ProductRouter = require('../controllers/ProductController');

router.get('/products', ProductRouter.getAllProduct);

module.exports = router;