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

const deleteProductById = async (req, res, next) => {
    try {

        const token = req.headers.authorization;
        const verifyToken = Middleware.checkToken(token);
        const { uuid } = req.body;

        if (verifyToken.message === 'Token is valid') {
            // Find the record by ID
            const dataProduct = await db.Product.findByPk(uuid);
            // If the record exists, delete it
            if (dataProduct) {
                await dataProduct.destroy();
                return res.status(200).json({
                    status: "success",
                    code: 200,
                    message: "message from backend"
                });
            } else {
                return res.status(404).json({
                    status: "success",
                    code: 404,
                    message: "Data not found"
                });
            }
        }
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
}

const updateProductUsingPutById = async (req, res, next) => {
    try {

        const token = req.headers.authorization;
        const verifyToken = Middleware.checkToken(token);
        const paramValue = req.query.uuid;
        const { name, price } = req.body;

        if (verifyToken.message === 'Token is valid') {

            await db.Product.update({ name: name, price: price }, {
                where: {
                    id: paramValue
                }
            });

            const dataProduct = await db.Product.findByPk(paramValue, {
                attributes: ['id', 'name', 'price']
            });

            if (dataProduct) {
                return res.status(200).json({
                    status: "success",
                    code: 200,
                    message: "message from backend",
                    results: {
                        data: dataProduct
                    }
                });
            } else {
                return res.status(404).json({
                    status: "success",
                    code: 404,
                    message: "Data not found"
                });
            }
        }
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
}




module.exports = {
    getAllProduct,
    deleteProductById,
    updateProductUsingPutById
}