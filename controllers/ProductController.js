const Middleware = require('../middleware/Auth');
const db = require('../models/Index');

const getAllProduct = async (req, res, next) => {

    try {

        const token = req.headers.authorization;
        const verifyToken = Middleware.checkToken(token);

        if (verifyToken.message === 'Token is valid') {
            const productData = await db.Product.findAll({ attributes: ['id', 'name', 'price'] });

            return res.status(200).json({
                status: "success",
                code: 200,
                message: "message from backend",
                results: {
                    products: productData
                }
            });
        }
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
}

module.exports = {
    getAllProduct
}