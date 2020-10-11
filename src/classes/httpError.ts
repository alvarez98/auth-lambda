class HttpError extends Error {
    message:string
    code:number
    constructor(code = 500, message = 'Internal server error', ...params) {
      super(...params)
      if (Error.captureStackTrace) {
        Error.captureStackTrace(this, HttpError)
      }
      this.name = 'HttpError'
      this.message = message
      this.code = code
    }
}

export default HttpError