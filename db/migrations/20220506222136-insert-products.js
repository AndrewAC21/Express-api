'use strict';

const { faker } = require('@faker-js/faker');

const { PRODUCT_TABLE } = require('../models/product.model');

const products = [...Array(30)].map((product) => ({
  name: faker.commerce.productName(),
  image: faker.image.imageUrl(),
  description: faker.commerce.productDescription(),
  price: faker.commerce.price(1000, 10000, 0),
  created_at: faker.date.recent(10),
  category_id: faker.random.numeric(1, {
    bannedDigits: ['4', '5', '6', '7', '8', '9', '0'],
  }),
}));

module.exports = {
  async up(queryInterface, Sequelize) {
    queryInterface.bulkInsert(PRODUCT_TABLE, products);
  },
  async down(queryInterface, Sequelize) {
    queryInterface.bulkDelete(PRODUCT_TABLE);
  },
};
