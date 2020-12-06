const Sequelize = require('sequelize')
const ApiKeyModel = require('./apikeys')
const UserModel = require('./users')

const connection = new Sequelize(
  process.env.DB_MYSQL,
  process.env.DB_MYSQL_USER,
  process.env.DB_MYSQL_PASS,
  {
    dialect: 'mysql',
    host: process.env.DB_MYSQL_HOST,
    port: process.env.DB_MYSQL_PORT
  }
)
const User = connection.define('Users', UserModel, { timestamps: false })
const ApiKey = connection.define('ApiKeys', ApiKeyModel, { timestamps: false })
const Models = { ApiKey, User }

module.exports = Models