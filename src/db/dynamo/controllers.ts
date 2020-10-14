import { v4 as uuidv4 } from 'uuid'
import * as moment from "moment"
import docClient from "./config";
import { promisify } from "util";
import HttpError from '../../classes/httpError';
const dynamoDBGetAsync = promisify(docClient.put).bind(docClient)

const saveSession = async ({ data, token }) => {
    const params = {
        TableName: 'Sessions',
        Item: {
            SID: uuidv4(),
            SToken: token,
            SDate: moment().format('DD.MM.YYYY HH:mm')
        }
    }
    const res = await dynamoDBGetAsync(params).catch(error => error)
    if (res instanceof Error) throw new HttpError()
    return { data: null }
}


export default saveSession