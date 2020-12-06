const HttpError = require("../classes/httpError") 
const { validateApiKey } = require("../db/mysql/controllers/apikeys") 

/**
 * @function verifyCredentials
 * @description Verifica el header authorization
 * @param {Array} returns - Campos a obtener
 * @param {Object} event - Serverless event
 * @return {Object} valores obtenidos del objeto
 */
const verifyCredentials = async (event) => {
    const error_message = 'API KEY is required', { headers } = event   
    if (!headers.Authorization || 
        !headers.Authorization.split(' ')[1]) throw new HttpError(401, error_message)
    const isValid = await validateApiKey(headers.Authorization.split(' ')[1]).catch(error => error)
    if (isValid instanceof Error) throw new HttpError()
    if(isValid === 0) throw new HttpError(401, 'Invalid API KEY')
    return event
}

module.exports = verifyCredentials