const boom = require('@hapi/boom');
// const requestPool = require('./../libs/postgres.pool');

const { models } = require('./../libs/sequelize');

class CategoryService {
  constructor() {
    // this.pool = requestPool;
    // this.pool.on('error', (err) => console.log(err));
  }
  async create(data) {
    const newCategory = await models.Category.create(data);
    return newCategory;
  }

  async find() {
    //   const query = 'SELECT * FROM tasks';
    //   const rta = await this.pool.query(query);
    //   return rta.rows;
    const category = await models.Category.findAll();
    return category;
  }

  async findOne(id) {
    const category = await models.Category.findByPk(id, {
      include: 'products',
    });
    return category;
  }

  async update(id, changes) {
    return {
      id,
      changes,
    };
  }

  async delete(id) {
    return { id };
  }
}

module.exports = CategoryService;
