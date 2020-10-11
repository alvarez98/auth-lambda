import { APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register';
import Response from "./classes/response"
import validateData from './utils/validateData';
import findUser from './db/postgres/controllers';
import matchPassword from './utils/matchPassword';
import generateToken from './utils/jwt';
import saveSession from './db/dynamo/controllers';
import HttpError from './classes/httpError';
import pipe from './utils/pipe'
import sendSuccessResponse from './utils/sendSuccessResponse';

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
    generateToken({ duration: null }),
    saveSession,
    generateToken({ duration: 15 }),
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
