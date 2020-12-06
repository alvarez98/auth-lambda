const Sequelize = require('sequelize');

const ApiKeyModel = {
  APIID: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },
  APIKey: {
    unique: true,
    type: Sequelize.STRING
  },
  APISecret: {
    type: Sequelize.STRING
  },
  APIExpiration: {
    type: Sequelize.DATE
  },
  APIStatus: {
    type: Sequelize.INTEGER
  }
}

module.exports = ApiKeyModel