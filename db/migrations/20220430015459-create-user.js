'use strict';

const { USER_TABLE, UserSchema } = require('../models/user.model');

module.exports = {
  // async up(queryInterface) {
  //   await queryInterface.createTable(USER_TABLE, UserSchema);
  // Se crea una tabla adicional que almacena las migraciones hechas
  async up(queryInterface) {
    //Se deja asi para que el modelo actual no corrompa las migraciones
    await queryInterface.createTable(USER_TABLE, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      email: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: true,
      },
      password: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      createdAt: {
        allowNull: null,
        type: DataTypes.DATE,
        field: 'created_at',
        defaultValue: Sequelize.NOW,
      },
    });
    // Se crea una tabla adicional que almacena las migraciones hechas
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(USER_TABLE);
    // Al ejecutar esta, se elimina el registro de SequelizeMeta
  },
};
