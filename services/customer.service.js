const boom = require('@hapi/boom');
const { models } = require('./../libs/sequelize');
class CustomerService {
  constructor() {}
  async create(data) {
    const newCustomer = await models.Customer.create(data, {
      include: ['user'], //Cuando encuentre una instancia llamada users, debido a la asociación, va a crear el user
    });
    return newCustomer;
  }
  async find() {
    const rta = await models.Customer.findAll({
      include: ['user'],
    });
    return rta;
  }
  async findOne(id) {
    const rta = await models.Customer.findByPk(id);
    if (!rta) {
      throw boom.notFound('Customer not found');
    }
    return rta;
  }
  async update(id, changes) {
    const updateCustomer = await this.findOne(id);
    const rta = await updateCustomer.update(changes);
    return rta;
  }
  async delete(id) {
    const deletedUser = await this.findOne(id);
    await deletedUser.destroy();
    return { id };
  }
}

module.exports = CustomerService;
