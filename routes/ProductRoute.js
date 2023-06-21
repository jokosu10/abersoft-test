const express = require("express");
const router = express();

const ProductRouter = require('../controllers/ProductController');

router.get('/products', ProductRouter.getAllProduct);
router.delete('/products', ProductRouter.deleteProductById);
router.put('/products', ProductRouter.updateProductUsingPutById);

module.exports = router;