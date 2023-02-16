const { Op } = require('sequelize');
const boom = require('@hapi/boom');

const pool = require('./../libs/postgres.pool.js');

const { models } = require('./../libs/sequelize');
class ProductsService {
  constructor() {
    // Ya no necesitamos el pool ya que sequelize lo hace
    // this.pool = pool; //Genera la conexion pool
    // this.pool.on('error', (err) => console.error(err)); //Está pendiente por si surge algun error
  }
  async create(data) {
    const newProduct = models.Product.create(data);
    return newProduct;
  }

  async find(query) {
    // const query = 'SELECT * FROM tasks';
    // // const rta = await this.pool.query(query);
    // // return rta.rows;
    // const [data, metadata] = await sequelize.query(query);
    // devuelve un array data y metadata
    // const rta = await models.Product.findAll({
    //   include: { model: models.Category, as: 'category', attributes: ['name'] },
    // });
    const options = {
      include: { model: models.Category, as: 'category', attributes: ['name'] },
      where: {},
    };
    const { offset, limit } = query;
    if (offset && limit) {
      (options.limit = limit), (options.offset = offset);
    }
    const { price } = query;
    if (price) {
      options.where.price = price;
    }
    const { price_min, price_max } = query;
    if (price_min && price_max) {
      options.where.price = {
        // [Op.gte]: price_min,
        // [Op.lte]: price_max,
        [Op.between]: [price_min, price_max],
      };
    }
    const products = await models.Product.findAll(options);
    return products;
  }

  async findOne(id) {
    // const product = this.products.find((item) => item.id === id);
    // if (!product) {
    //   throw boom.notFound('product not found');
    // }
    // if (product.isBlock) {
    //   throw boom.conflict('product is block');
    // }
    const product = await models.Product.findByPk(id, {
      include: { model: models.Category, as: 'category', attributes: ['name'] },
    });
    return product;
  }

  async update(id, changes) {
    const index = this.products.findIndex((item) => item.id === id);
    if (index === -1) {
      throw boom.notFound('product not found');
    }
    const product = this.products[index];
    this.products[index] = {
      ...product,
      ...changes,
    };
    return this.products[index];
  }

  async delete(id) {
    const index = this.products.findIndex((item) => item.id === id);
    if (index === -1) {
      throw boom.notFound('product not found');
    }
    this.products.splice(index, 1);
    return { id };
  }
}

module.exports = ProductsService;
