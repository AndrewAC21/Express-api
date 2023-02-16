const { Pool } = require('pg');
const { config, dbHost, dbPort, dbName } = require('./../config/config');

let URI;
if (config.isProd) {
  URI = config.dbUrl;
} else {
  const USER = encodeURIComponent(config.dbUser);
  const PASSWORD = encodeURIComponent(config.dbPassword);
  URI = `postgres://${USER}:${PASSWORD}@${dbHost}:${dbPort}/${dbName}`;
  // La URI se conforma por “protocolo/USUARIO:CONTRASEÑA@HOST:PUERTO/NOMBREDB
}

// const pool = new Pool({
//   host: 'localhost',
//   port: 5432,
//   user: 'andrew',
//   password: 'admin123',
//   database: 'my_store',
// });

const pool = new Pool({ connectionString: URI });

module.exports = pool;

// Un pool de conexiones es un conjunto limitado de conexiones a una base de datos, que es manejado por un servidor de aplicaciones de forma tal, que dichas conexiones pueden ser reutilizadas por los diferentes usuarios.
