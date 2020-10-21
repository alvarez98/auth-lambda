import { APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register';
import Response from "./classes/response"
import {validateData, validateMultipleData} from './utils/validateData';
import {findUser, updateInDB} from './db/postgres/controllers';
import matchPassword from './utils/matchPassword';
import generateToken from './utils/jwt';
import {saveSession, getTokenInDB} from './db/dynamo/controllers';
import HttpError from './classes/httpError';
import pipe from './utils/pipe'
import sendSuccessResponse from './utils/sendSuccessResponse';
import validateApiKey from './utils/validateApiKey';
import { encryptPassword } from './utils/bcrypt';

/**
 * @function auth
 * @description Lambda for POST /auth
 * @param {Object} event
 * @param {Object} _context
 */
export const auth = async (event, _context) => {
  const Res = new Response()
  return pipe(
    validateData('auth'),
    findUser,
    matchPassword,
    generateToken({ duration: 15, encryptData: false }),
    saveSession,
    sendSuccessResponse(Res)
  )(JSON.parse(event.body))
    .then(res => res)
    .catch(error =>
      error instanceof HttpError ?
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
export const home: APIGatewayProxyHandler = async (event, _context) => {
  return new Response().success({ event })
}

/**
 * @function getUserBySessionID
 * @description Lambda for GET /session/{uuid}
 * @param {Object} event
 * @param {Object} _context
*/
export const getTokenBySessionID = async (event, _context) => {
  const Res = new Response()
  return pipe(
    validateApiKey({ returns: ['pathParameters'] }),
    validateData('uuid'),
    getTokenInDB,
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
 * @function updatePassword
 * @description Lambda for PUT /users/{id}/password
 * @param {Object} event
 * @param {Object} _context
*/
export const updatePassword = async (event, _context) => {
  event.body = JSON.parse(event.body)
  const Res = new Response()
  return pipe(
    validateApiKey({ returns: ['pathParameters', 'body']}),
    validateMultipleData(['id', 'password']),
    encryptPassword,
    updateInDB,
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
 * @function updateEmail
 * @description Lambda for PUT /users/{id}/email
 * @param {Object} event
 * @param {Object} _context
*/
export const updateEmail = async (event, _context) => {
  event.body = JSON.parse(event.body)
  const Res = new Response()
  return pipe(
    validateApiKey({ returns: ['pathParameters', 'body']}),
    validateMultipleData(['id', 'email']),
    updateInDB,
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
 * @function updateUser
 * @description Lambda for PUT /users/{id}
 * @param {Object} event
 * @param {Object} _context
*/
export const updateUser = async (event, _context) => {
  event.body = JSON.parse(event.body)
  const Res = new Response()
  return pipe(
    validateApiKey({ returns: ['pathParameters', 'body']}),
    validateMultipleData(['id', 'user']),
    updateInDB,
    sendSuccessResponse(Res)
  )(event)
    .then(res => res)
    .catch(error =>
      error instanceof HttpError ?
        Res.error(error.code, error.message) :
        Res.error()
    )
}