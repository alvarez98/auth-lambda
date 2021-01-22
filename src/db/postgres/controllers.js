const { Op } = require('sequelize')
const { User } = require('./models')

module.exports.findUser = (body) => {
  return User.findOne({
    where: {
      WUserEmail: { [Op.eq]: body.email },
      Inactive: { [Op.eq]: 0 },
      Cancelled: { [Op.eq]: 0 },
    },
    attributes: [
      'WUserID',
      'WUserEmail',
      'WUserFirstName',
      'WUserLastName',
      'WUserPassword',
    ],
  })
}

module.exports.updateInDB = (body, id) => {
  return User.update(body, {
    where: {
      WUserID: id,
    },
  })
}
