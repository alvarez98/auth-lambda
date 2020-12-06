const jwt = require("jsonwebtoken")
const { SECRET } = process.env

/**
 * @function generateToken
 * @description Funtion to generate token
 * @param {Object} data Contiene el payload del token
 * @param {Object} time Contiene el tiempo de expiración del token.
 * @return {String} retorna un token
*/
const generateToken = ({ duration, encryptData }) => (args) => {
    const payload = args.data && encryptData ? args.data : {}
    if (duration) payload.exp = Math.floor((Date.now() / 1000) + (duration * 60))
    return { ...args, token: jwt.sign(payload, SECRET) }
}

module.exports = generateToken