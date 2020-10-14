import { v4 as uuidv4 } from 'uuid'
import * as moment from "moment"
import docClient from "./config";
import { promisify } from "util";
import HttpError from '../../classes/httpError';
const dynamoDBGetAsync = promisify(docClient.put).bind(docClient)

const saveSession = async ({ data, token }) => {
    const uuid = uuidv4()
    const params = {
        TableName: 'Sessions',
        Item: {
            SID: uuid,
            SToken: token,
            SDate: moment().format('DD.MM.YYYY HH:mm'),
            SIDUser: data.WUserID,

        }
    }
    const res = await dynamoDBGetAsync(params).catch(error => error)
    if (res instanceof Error) throw new HttpError()
    return { session: uuid, token }
}

export default saveSession