const Sequelize = require('sequelize')

const UserModel = {
  WUserID: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },
  WUserEmail: {
    unique: true,
    type: Sequelize.STRING
  },
  WUserFullName: {
    type: Sequelize.STRING
  },
  WUserFirstName: {
    type: Sequelize.STRING
  },
  WUserLastName: {
    type: Sequelize.STRING
  },
  Inactive: {
    type: Sequelize.INTEGER
  },
  Cancelled: {
    type: Sequelize.INTEGER
  },
  WUserPassword: {
    type: Sequelize.STRING
  }
}
module.exports = UserModel