const { v4: uuidv4 } = require('uuid')
const moment = require("moment")
const docClient = require("./config")
const { promisify } = require("util")
const HttpError = require('../../classes/httpError')
const dynamoDBPutAsync = promisify(docClient.put).bind(docClient)
const dynamoDBGetAsync = promisify(docClient.scan).bind(docClient)

module.exports.saveSession = async ({ data, token }) => {
    const uuid = uuidv4()
    const params = {
        TableName: 'Sessions',
        Item: {
            SID: uuid,
            SToken: token,
            SDate: moment().format('DD.MM.YYYY HH:mm'),
            SUserID: data.WUserID,
            SUserLastName: data.WUserLastName,
            SUserFirstName: data.WUserFirstName,
            SUserEmail: data.WUserEmail
        }
    }
    const res = await dynamoDBPutAsync(params).catch(error => error)
    if (res instanceof Error) throw new HttpError(500, res)
    return { session: uuid }
}

module.exports.getTokenInDB = async ({ pathParameters }) => {
    const params = {
        TableName:'Sessions',
        FilterExpression:'#uuid = :uuid',
        ExpressionAttributeNames:{ '#uuid':'SID', '#stoken':'SToken' },
        ExpressionAttributeValues:{ ':uuid': pathParameters.uuid },
        Select: "SPECIFIC_ATTRIBUTES",
        ProjectionExpression: "#stoken", 
    }
    const res = await dynamoDBGetAsync(params).catch(error => error)
    if (res instanceof Error) throw new HttpError()
    if(res.Count === 0) throw new HttpError(404, 'Not found')  
    return { token: res.Items[0].SToken }
}