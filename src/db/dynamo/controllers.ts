import { v4 as uuidv4 } from 'uuid'
import * as moment from "moment"
import docClient from "./config";
import { promisify } from "util";
import HttpError from '../../classes/httpError';
const dynamoDBPutAsync = promisify(docClient.put).bind(docClient)
const dynamoDBGetAsync = promisify(docClient.scan).bind(docClient)

export const saveSession = async ({ data, token }) => {
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
    if (res instanceof Error) throw new HttpError()
    return { session: uuid, token }
}

export const getTokenInDB = async ({ uuid }) => {
    const params = {
        TableName:'Sessions',
        FilterExpression:'#uuid = :uuid',
        ExpressionAttributeNames:{ '#uuid':'SID', '#stoken':'SToken' },
        ExpressionAttributeValues:{ ':uuid': uuid },
        Select: "SPECIFIC_ATTRIBUTES",
        ProjectionExpression: "#stoken", 
    }
    const res = await dynamoDBGetAsync(params).catch(error => error)
    if (res instanceof Error) throw new HttpError()
    if(res.Count === 0) throw new HttpError(404, 'Not found')  
    return { token: res.Items[0].SToken }
}