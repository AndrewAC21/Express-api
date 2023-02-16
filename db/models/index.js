const { User, UserSchema } = require('./user.model');
const { Order, OrderSchema } = require('./order.model');
const { Customer, CustomerSchema } = require('./customer.model');
const { Product, ProductSchema } = require('./product.model');
const { Category, CategorySchema } = require('./category.model');
const {
  ORDER_PRODUCT_TABLE,
  OrderProductSchema,
  OrderProduct,
} = require('../models/order-product.model');
function setupModels(sequelize) {
  User.init(UserSchema, User.confing(sequelize));
  // Init inicia
  //user.init(El modelo que queremos usar, la configuración que queremos usar)
  Order.init(OrderSchema, Order.config(sequelize));
  Customer.init(CustomerSchema, Customer.config(sequelize));
  Product.init(ProductSchema, Product.config(sequelize));
  Category.init(CategorySchema, Category.config(sequelize));
  OrderProduct.init(OrderProductSchema, OrderProduct.config(sequelize));

  User.associate(sequelize.models);
  Customer.associate(sequelize.models);
  Product.associate(sequelize.models);
  Category.associate(sequelize.models);
  Order.associate(sequelize.models);
}

module.exports = setupModels;
