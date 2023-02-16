const { Sequelize } = require('sequelize');

const {
  config: { dbUser, dbPassword, dbHost, dbPort, dbName, dbUrl, isProd },
} = require('./../config/config');

const setupModels = require('./../db/models');

// const USER = encodeURIComponent(dbUser);
// const PASSWORD = encodeURIComponent(dbPassword);
// const URI = `postgres://${USER}:${PASSWORD}@${dbHost}:${dbPort}/${dbName}`;
const options = {
  dialect: 'postgres', //Definde que db estamos usando
  logging: false, //console.log, //Devuelve en consola el codigo SQL que se está usando en la consulta
};
if (isProd) {
  options.dialectOption = {
    ssl: {
      rejectUnauthorized: false, // Esto se necesita que solo corra en produccion
    },
  };
}
const sequelize = new Sequelize(dbUrl, options);

setupModels(sequelize);

// Se va a cancelar por lo que se va a implementar las migraciones
// sequelize.sync(); // Lee los modelos y crea los modelos si no estan ya en la bd  // Aunque no se recomienda en un ambiente de produccion

module.exports = sequelize;

// Sequelize es un ORM es Object Relational Model transforma y mapea la base de datos con metodos de POO

// Este es agnostico, lo cual significa que puede cambiar rapidamente de base de datos SQL y seguir funcionando
