'use strict';

const { PRODUCT_TABLE, ProductSchema } = require('../models/product.model');
const { CATEGORY_TABLE, CategorySchema } = require('../models/category.model');

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(CATEGORY_TABLE, CategorySchema);
    await queryInterface.createTable(PRODUCT_TABLE, ProductSchema);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(CATEGORY_TABLE);
    await queryInterface.dropTable(PRODUCT_TABLE);
  },
};
