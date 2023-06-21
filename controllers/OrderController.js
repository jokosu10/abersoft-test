const Middleware = require('../middleware/Auth');
const db = require('../models/Index');

const postOrder = async (req, res, next) => {
    try {
        const token = req.headers.authorization;
        const verifyToken = Middleware.checkToken(token);

        if (verifyToken.message === 'Token is valid') {
            const { products } = req.body;

            // Create a new order
            const order = await db.Order.create();

            // Create the order items
            const orderItems = await Promise.all(products.map(async (productData) => {
                const { uuid, total } = productData;

                // Find the product by UUID or create a new one if not found
                var product = await db.Product.findOne({ where: { id: uuid } });

                if (!product) {
                    return res.status(404).json({
                        status: "success",
                        code: 404,
                        message: "Data product not found"
                    });
                }

                // Associate the product with the order
                await product.update({ order_id: order.id });

                // Create the order item
                return { productId: product.id, total };
            }));

            // Update the total for the order based on the order items
            const orderTotal = orderItems.reduce((acc, item) => acc + item.total, 0);
            await order.update({ total: orderTotal });

            return res.status(200).json({
                status: "success",
                code: 200,
                message: "message from backend"
            });
        }
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
}

module.exports = {
    postOrder
}