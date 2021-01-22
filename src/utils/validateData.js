const schemas = require('./schemas')
const HttpError = require('../classes/httpError')

/**
 * @function validateData
 * @param schema
 * @returns {Function} params {Object} data
 */
const validateData = (schema = 'auth', data) => {
    const validation = schemas[schema].validate(data)
    if(validation.error) throw new HttpError(400, validation.error.details[0].message)
    return data
}

module.exports = {
    validateData
}