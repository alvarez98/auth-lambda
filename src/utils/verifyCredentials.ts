import HttpError from "../classes/httpError"
import getFields from "./getFields"
import { validateApiKey } from "../db/postgres/controllers"

const verifyCredentials = ({returns}) => async (event) => {
    const error_message = 'API KEY is required', {headers} = event   
    if (!headers.Authorization || 
        !headers.Authorization.split(' ')[1]) throw new HttpError(401, error_message)
    const isValid = await validateApiKey(headers.Authorization.split(' ')[1])
    if( isValid === 0) throw new HttpError(401, 'Invalid API KEY')
    return getFields(event, returns)
}

export default verifyCredentials