class HttpError extends Error {
    message = 'Internal server error'
    code = 500
    constructor(code, message, ...params) {
      super(...params)
      if (Error.captureStackTrace) {
        Error.captureStackTrace(this, HttpError)
      }
      this.name = 'HttpError'
      this.message = message
      this.code = code
    }
}

module.exports = HttpError