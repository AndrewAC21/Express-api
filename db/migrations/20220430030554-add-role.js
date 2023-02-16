'use strict';

const { USER_TABLE, UserSchema } = require('../models/user.model');

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn(USER_TABLE, 'role', UserSchema.role);
    // AddColumn inserta una nueva columna en una tabla ya creada
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn(USER_TABLE, 'role');
  },
};
