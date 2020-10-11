import schemas from './schemas'
import HttpError from '../classes/httpError'

/**
 * @function validateData
 * @param schema
 * @returns {Function} params {Object} data
 */
const validateData = (schema = 'auth') => (data) => {
    const validation = schemas[schema].validate(data)
    if(validation.error) throw new HttpError(400, validation.error.details[0].message)
    return data
}

export default validateData