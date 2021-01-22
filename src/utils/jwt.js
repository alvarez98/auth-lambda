const jwt = require('jsonwebtoken')
const { JWT_SECRET } = process.env

/**
 * @function generateToken
 * @description Funtion to generate token
 * @param {Object} data Contiene el payload del token
 * @param {Object} time Contiene el tiempo de expiración del token.
 * @return {String} retorna un token
 */
const generateToken = (expiration, data) => {
  if (expiration) data.exp = Math.floor(Date.now() / 1000 + expiration * 60)
  return jwt.sign(data, JWT_SECRET)
}

module.exports = generateToken
