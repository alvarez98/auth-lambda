import schemas from './schemas'
import HttpError from '../classes/httpError'

/**
 * @function validateData
 * @param schema
 * @returns {Function} params {Object} data
 */
export const validateData = (schema = 'auth') => (data) => {
    const validation = schemas[schema].validate(data)
    if(validation.error) throw new HttpError(400, validation.error.details[0].message)
    return data
}

/**
 * @function validateMultipleData
 * @param schema
 * @returns {Function} params {Object} data
 */
export const validateMultipleData = (matchSchemas) => ({data, fields}) => {
    matchSchemas.forEach((schema, index) => {
        validateData(schema)(data[fields[index]])
    })
    return data
}