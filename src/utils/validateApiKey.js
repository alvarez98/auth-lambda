const HttpError = require('../classes/httpError')

const validateApiKey = (event) => {
  const error_message = 'Unauthorized'
  if (
    !event.headers.Authorization ||
    !event.headers.Authorization.split(' ')[1]
  )
    throw new HttpError(401, error_message)
}

module.exports = validateApiKey
