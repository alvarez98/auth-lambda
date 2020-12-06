const Response = require("./classes/response")
const { validate, validateData } = require('./utils/validateData')
const { findUser, updateUserInDB, addUserInDB } = require('./db/mysql/controllers/users')
const matchPassword = require('./utils/matchPassword')
const generateToken = require('./utils/jwt')
const { saveSession, getTokenInDB } = require('./db/dynamo/controllers')
const HttpError = require('./classes/httpError')
const pipe = require('./utils/pipe') 
const sendSuccessResponse = require('./utils/sendSuccessResponse')
const verifyCredentials = require('./utils/verifyCredentials')
const { encryptPassword } = require('./utils/bcrypt')
const getFields = require("./utils/getFields")

/**
 * @function auth
 * @description Lambda for POST /auth
 * @param {Object} event
 * @param {Object} _context
 */
module.exports.auth = async (event, _context) => {
  const Res = new Response()
  return pipe(
    validate('auth'),
    findUser,
    matchPassword,
    generateToken({ duration: 15, encryptData: false }),
    saveSession,
    sendSuccessResponse(Res)
  )(JSON.parse(event.body))
    .then(res => res)
    .catch(error => error instanceof HttpError ?
        Res.error(error.code, error.message) :
        Res.error()
    )
}

/**
 * @function home
 * @description Lambda for GET /home
 * @param {Object} event
 * @param {Object} _context
 */
module.exports.home = async (event, _context) => {
  const Res = new Response()
  try {
    return Res.success({ event })
  } catch (error) {
    return Res.error(500, error)
  }
}

/**
 * @function getUserBySessionID
 * @description Lambda for GET /session/{uuid}
 * @param {Object} event
 * @param {Object} _context
*/
module.exports.getTokenBySessionID = async (event, _context) => {
  const Res = new Response()
  return pipe(
    verifyCredentials,
    getFields(['pathParameters']),
    validateData(['uuid']),
    getTokenInDB,
    sendSuccessResponse(Res)
  )(event)
    .then(res => res)
    .catch(error => {
      console.log(error)
      return error instanceof HttpError ?
      Res.error(error.code, error.message) :
      Res.error()
    })
}

/**
 * @function updatePassword
 * @description Lambda for PUT /users/{id}/password
 * @param {Object} event
 * @param {Object} _context
*/
module.exports.updatePassword = async (event, _context) => {
  event.body = JSON.parse(event.body)
  const Res = new Response()
  return pipe(
    verifyCredentials,
    getFields(['pathParameters', 'body']),
    validateData(['id', 'password']),
    encryptPassword,
    updateUserInDB,
    sendSuccessResponse(Res)
  )(event)
    .then(res => res)
    .catch(error => {
      console.log(error)
      return error instanceof HttpError ?
        Res.error(error.code, error.message) :
        Res.error()
    })
}

/**
 * @function updateEmail
 * @description Lambda for PUT /users/{id}/email
 * @param {Object} event
 * @param {Object} _context
*/
module.exports.updateEmail = async (event, _context) => {
  event.body = JSON.parse(event.body)
  const Res = new Response()
  return pipe(
    verifyCredentials,
    getFields(['pathParameters', 'body']),
    validateData(['id', 'email']),
    updateUserInDB,
    sendSuccessResponse(Res)
  )(event)
    .then(res => res)
    .catch(error => error instanceof HttpError ?
        Res.error(error.code, error.message) :
        Res.error()
    )
}

/**
 * @function updateUser
 * @description Lambda for PUT /users/{id}
 * @param {Object} event
 * @param {Object} _context
*/
module.exports.updateUser = async (event, _context) => {
  event.body = JSON.parse(event.body)
  const Res = new Response()
  return pipe(
    verifyCredentials,
    getFields(['pathParameters', 'body']),
    validateData(['id', 'updateUser']),
    updateUserInDB,
    sendSuccessResponse(Res)
  )(event)
    .then(res => res)
    .catch(error =>
      error instanceof HttpError ?
        Res.error(error.code, error.message) :
        Res.error()
    )
}

/**
 * @function addUser
 * @description Lambda for PUT /users/{id}
 * @param {Object} event
 * @param {Object} _context
*/
module.exports.addUser = async (event, _context) => {
  event.body = JSON.parse(event.body)
  const Res = new Response()
  return pipe(
    verifyCredentials,
    getFields(['body']),
    validateData(['user']),
    encryptPassword,
    addUserInDB,
    sendSuccessResponse(Res)
  )(event)
    .then(res => res)
    .catch(error => {
      console.log(error)
      return error instanceof HttpError ?
        Res.error(error.code, error.message) :
        Res.error()
    })
}