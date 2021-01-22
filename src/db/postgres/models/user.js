const { Sequelize } = require('sequelize')
const dbConfig = require('../config')

const User = dbConfig.define(
  'Users',
  {
    WUserID: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    WUserEmail: {
      type: Sequelize.TEXT,
      allowNull: false,
      unique: true,
    },
    WUserFullName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    WUserFirstName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    WUserLastName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    Inactive: {
      type: Sequelize.STRING,
      defaultValue: 0,
    },
    Cancelled: {
      type: Sequelize.STRING,
      defaultValue: 0,
    },
    WUserPassword: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  { timestamps: false }
)
module.exports = User