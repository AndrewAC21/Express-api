const { Model, DataTypes, Sequelize } = require('sequelize');

const USER_TABLE = 'users';

const UserSchema = {
  //Define la estructura de la db
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
  role: {
    allowNull: false,
    type: DataTypes.STRING,
    defaultValue: 'customer',
  },
  createdAt: {
    allowNull: null,
    type: DataTypes.DATE,
    field: 'created_at', //Como queremos llamar a la columna,
    defaultValue: Sequelize.NOW, //El momento en el que se inserto ese registro con sequelize
  },
};

class User extends Model {
  static associate(models) {
    this.hasOne(models.Customer, {
      as: 'customer',
      foreignKey: 'userId', //Como va a encontrar a customer
    });
  }
  static confing(sequelize) {
    //Config recibe una conexión
    return {
      sequelize, // Cual conexión va a tener
      tableName: USER_TABLE, //Nombre de la table
      modelName: 'User', //Nombre del modelo
      timestamps: false,
    };
  }
}

module.exports = { USER_TABLE, UserSchema, User };
