const Response = require('./classes/response')
const { validateData } = require('./utils/validateData')
const { findUser, updateInDB } = require('./db/postgres/controllers')
const matchPassword = require('./utils/matchPassword')
const generateToken = require('./utils/jwt')
const { saveSession } = require('./db/dynamo/controllers')
const validateApiKey = require('./utils/validateApiKey')
const { encrypt } = require('./utils/bcrypt')

/**
 * @function auth
 * @description Lambda for POST /auth
 * @param {Object} event
 * @param {Object} _context
 */
module.exports.auth = async event => {
  const Res = new Response()
  try {
    const body = JSON.parse(event.body)
    validateApiKey(event)
    validateData('auth', body)
    const { WUserPassword, ...user } = (await findUser(body)).dataValues
    if (!user) return Res.error(401, 'Invalid credentials')
    const match = await matchPassword(WUserPassword, body.password)
    if (!match) return Res.error(401, 'Invalid credentials')
    const access_token = generateToken(15, user)
    const refresh_token = generateToken(60, user)
    user.sourceIp = event.requestContext.identity.sourceIp
    user.agent = event.requestContext.identity.userAgent
    await saveSession(user)
    return Res.success({ access_token, refresh_token })
  } catch (error) {
    console.log(error)
    return Res.error(400, error.message)
  }
}

/**
 * @function home
 * @description Lambda for GET /home
 * @param {Object} event
 * @param {Object} _context
 */
module.exports.home = async event => {
  return new Response().success({ event: event.requestContext })
}

/**
 * @function updatePassword
 * @description Lambda for PUT /users/{id}/password
 * @param {Object} event
 * @param {Object} _context
 */
module.exports.updatePassword = async event => {
  const Res = new Response()
  try {
    const body = JSON.parse(event.body)
    const { pathParameters } = event
    validateApiKey(event)
    validateData('id', pathParameters)
    validateData('password', body)
    body.password = encrypt(body.password)
    const user = await updateInDB(body, pathParameters.id)
    if (user[0] === 0) return Res.error(404, 'No changes were made')
    return Res.success({ message: 'Updated', id: pathParameters.id })
  } catch (error) {
    console.log(error)
    return Res.error(400, error.message)
  }
}

/**
 * @function updateEmail
 * @description Lambda for PUT /users/{id}/email
 * @param {Object} event
 * @param {Object} _context
 */
module.exports.updateEmail = async event => {
  const Res = new Response()
  try {
    const body = JSON.parse(event.body)
    const { pathParameters } = event
    validateApiKey(event)
    validateData('id', pathParameters)
    validateData('email', body)
    const user = await updateInDB(body, pathParameters.id)
    if (user[0] === 0) return Res.error(404, 'No changes were made')
    return Res.success({ message: 'Updated', id: pathParameters.id })
  } catch (error) {
    console.log(error)
    return Res.error(400, error.message)
  }
}

/**
 * @function updateUser
 * @description Lambda for PUT /users/{id}
 * @param {Object} event
 * @param {Object} _context
 */
module.exports.updateUser = async event => {
  const Res = new Response()
  try {
    const body = JSON.parse(event.body)
    const { pathParameters } = event
    validateApiKey(event)
    validateData('id', pathParameters)
    validateData('user', body)
    const user = await updateInDB(body, pathParameters.id)
    if (user[0] === 0) return Res.error(404, 'No changes were made')
    return Res.success({ message: 'Updated', id: pathParameters.id })
  } catch (error) {
    console.log(error)
    return Res.error(400, error.message)
  }
}

// /**
//  * @function getUserBySessionID
//  * @description Lambda for GET /session/{uuid}
//  * @param {Object} event
//  * @param {Object} _context
//  */
// module.exports.getTokenBySessionID = async (event, _context) => {
//   const Res = new Response()
//   return pipe(
//     validateApiKey({ returns: ['pathParameters'] }),
//     validateData('uuid'),
//     getTokenInDB,
//     sendSuccessResponse(Res)
//   )(event)
//     .then((res) => res)
//     .catch((error) =>
//       error instanceof HttpError
//         ? Res.error(error.code, error.message)
//         : Res.error()
//     )
// }
