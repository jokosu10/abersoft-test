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
                    msg: "Please input price name"
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

    return Product;
};