const { Model, DataTypes, Sequelize } = require('sequelize');
const { USER_TABLE } = require('./user.model');

const CUSTOMER_TABLE = 'customers';

const CustomerSchema = {
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
    unique: true,
    references: {
      model: USER_TABLE, // A que tabla va relacionada
      key: 'id', // Cual es la llave
    },
    onUpdate: 'CASCADE', //Que pasa cuando se actualize el id
    onDelete: 'SET NULL', // Que pasa cuando se elimine el Id
  },
};
class Customer extends Model {
  static associate(models) {
    this.belongsTo(models.User, { as: 'user' }); // Tiene el mayor peso en la relacion
    this.hasMany(models.Order, {
      as: 'orders',
      foreignKey: 'customerId',
    });
  }
  static config(sequelize) {
    return {
      sequelize,
      tableName: CUSTOMER_TABLE,
      modelName: 'Customer',
      timestamps: false,
    };
  }
}

module.exports = {
  CUSTOMER_TABLE,
  CustomerSchema,
  Customer,
};
