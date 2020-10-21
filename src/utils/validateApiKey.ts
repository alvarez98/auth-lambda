import HttpError from "../classes/httpError"

const validateApiKey = ({returns}) => (event) => {
    const error_message = 'Unauthorized'    
    if (!event.headers.Authorization || 
        !event.headers.Authorization.split(' ')[1]) throw new HttpError(401, error_message)
    
    const data = {}
    returns.forEach((item) => data[item] = event[item])
    return {data, fields: returns}
}

export default validateApiKey