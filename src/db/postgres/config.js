const sequelize = require('sequelize')

const { DB_PG, DB_PG_USER, DB_PG_PASS, DB_PG_HOST, DB_PG_PORT } = process.env

const dbConfig = new sequelize.Sequelize(DB_PG, DB_PG_USER, DB_PG_PASS, {
  port: Number(DB_PG_PORT) || 5432,
  host: DB_PG_HOST,
  dialect: 'mysql',
  dialectOptions: {},
  pool: { max: 5 },
})

module.exports = dbConfig
