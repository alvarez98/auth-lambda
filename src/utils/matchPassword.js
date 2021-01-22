const bcrypt = require('bcrypt')
const HttpError = require('../classes/httpError')

/**
 * @function matchPassword
 * @description Compare the encrypted password and the text sent as password
 * @param {Object} {body user}
*/
const matchPassword = (hash, password) => {
    return bcrypt.compare(password, hash)  
}

module.exports = matchPassword