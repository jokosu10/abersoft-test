'use strict';
const Sequelize = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    const Order = sequelize.define("Order", {
        id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true
        },
        total: {
            type: Sequelize.INTEGER,
            defaultValue: 0,
            allowNull: false,
            validate: {
                min: {
                    args: [0],
                    msg: "Total must be greater than or equal to 0"
                }
            }
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

    Order.associate = (models) => {
        Order.hasMany(models.Product, {
            foreignKey: 'order_id',
            as: 'products',
            onDelete: 'CASCADE',
            hooks: true,
        });
    };

    return Order;
};