'use strict';

const { CUSTOMER_TABLE, CustomerSchema } = require('../models/customer.model');

module.exports = {
  // async up (queryInterface, Sequelize) {
  // await queryInterface.createTable(CUSTOMER_TABLE,CustomerSchema)},
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(CUSTOMER_TABLE, {
      id: {
        allowNulld: false,
        type: DataTypes.INTEGER,
        field: 'id',
        primaryKey: true,
        autoIncrement: true,
      },
      firstName: {
        allowNull: false,
        type: DataTypes.STRING,
        field: 'first_name',
      },
      lastName: {
        allowNull: false,
        type: DataTypes.STRING,
        field: 'last_name',
      },
      phoneNumber: {
        allowNull: false,
        type: DataTypes.INTEGER,
        field: 'phone_number',
      },
      createdAt: {
        allowNull: false,
        field: 'created_at',
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW,
      },
      userId: {
        //Es la foreing key
        field: 'user_id',
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: USER_TABLE, // A que tabla va relacionada
          key: 'id', // Cual es la llave
        },
        onUpdate: 'CASCADE', //Que pasa cuando se actualize el id
        onDelete: 'SET NULL', // Que pasa cuando se elimine el Id
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(CUSTOMER_TABLE);
  },
};
