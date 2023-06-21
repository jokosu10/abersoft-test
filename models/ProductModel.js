'use strict';
const Sequelize = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    const Product = sequelize.define("Product", {
        id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true
        },
        name: {
            type: Sequelize.STRING,
            defaultValue: "",
            allowNull: false,
            required: true,
            validate: {
                notEmpty: {
                    args: [0],
                    msg: "Please input product name"
                }
            }
        },
        price: {
            type: Sequelize.INTEGER,
            defaultValue: 0,
            allowNull: false,
            required: true,
            validate: {
                notEmpty: {
                    args: [0],
                    msg: "Please input price name"
                }
            }
        },
        order_id: {
            allowNull: false,
            type: Sequelize.UUID,
            references: {
                model: 'Order', // Name of the referenced model (should match the actual model name)
                key: 'id', // Name of the referenced column in the Order model
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
        },
        created_at: {
            type: Sequelize.DATE(),
            allowNull: false,
            defaultValue: Sequelize.NOW
        },
        updated_at: {
            type: Sequelize.DATE(),
            allowNull: false,
            defaultValue: Sequelize.NOW
        }
    }, {
        underscored: true
    });

    Product.associate = (models) => {
        Product.belongsTo(models.Order, {
            foreignKey: 'order_id',
            as: 'order',
            onDelete: 'CASCADE',
        });
    };

    return Product;
};