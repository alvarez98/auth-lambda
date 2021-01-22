const { v4: uuidv4 } = require('uuid')
const moment = require('moment')
const docClient = require('./config')

module.exports.saveSession = async (data) => {
  const params = {
    TableName: 'Sessions',
    Item: {
      SID: uuidv4(),
      SDate: moment().format('DD.MM.YYYY HH:mm'),
      SUserID: data.WUserID,
      SUserLastName: data.WUserLastName,
      SUserFirstName: data.WUserFirstName,
      SUserEmail: data.WUserEmail,
      SSourceIp: data.sourceIp,
      SAgent: data.agent
    },
  }
  return docClient
    .put(params)
    .promise()
}

module.exports.getTokenInDB = async (uuid) => {
  const params = {
    TableName: 'Sessions',
    FilterExpression: '#uuid = :uuid',
    ExpressionAttributeNames: { '#uuid': 'SID', '#stoken': 'SToken' },
    ExpressionAttributeValues: { ':uuid': uuid },
    Select: 'SPECIFIC_ATTRIBUTES',
    ProjectionExpression: '#stoken',
  }
  return docClient
    .scan(params)
    .promise()
}
