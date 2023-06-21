const express = require("express");
const router = express();

const ProductRouter = require('../controllers/ProductController');

router.get('/products', ProductRouter.getAllProduct);
router.delete('/products', ProductRouter.deleteProductById);

module.exports = router;