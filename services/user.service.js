const boom = require('@hapi/boom');
const { boolean } = require('joi');

const getConnection = require('./../libs/postgres');
const getConnectionPool = require('./../libs/postgres.pool');

const { models } = require('./../libs/sequelize');
class UserService {
  constructor() {
    // this.pool = getConnectionPool; //Genera la conexion pool
    // this.pool.on('error', (err) => console.error(err)); //Está pendiente por si surge algun error
  }

  async create(data) {
    const newUser = await models.User.create(data);
    return newUser;
  }

  async find() {
    // const client = await getConnection(); Si se evidencia mayor tiempo para hacer una peticion nueva

    const rta = await models.User.findAll({
      include: ['customer'],
    }); // Va a los modelos que tenemos en sequelize.js, y especificamente a User, en el cual aplica un metodo findAll() que es nativo
    return rta;
  }

  async findOne(id) {
    const rta = await models.User.findByPk(id);
    if (!rta) {
      throw boom.notFound('User not found');
    }
    return rta;
  }

  async update(id, changes) {
    const user = await this.findOne(id);
    const rta = await user.update(changes);

    return rta;
  }

  async delete(id) {
    const user = await this.findOne(id);
    await user.destroy();
    return { id };
  }
}

module.exports = UserService;
