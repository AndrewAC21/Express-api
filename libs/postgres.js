const {Client} = require("pg")

async function getConnection(){

  const client = new Client({
    host: "localhost",
  port: 5432,
  user: "andrew",
  password:"admin123",
  database:"my_store"
})
  await client.connect() //Esta función devuelve una promesa por lo que hay que hacerla asincrona
  return client
}

module.exports = getConnection

