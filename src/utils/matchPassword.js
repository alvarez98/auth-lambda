const bcrypt = require('bcrypt')
const HttpError = require('../classes/httpError')

/**
 * @function matchPassword
 * @description Compare the encrypted password and the text sent as password
 * @param {Object} {body user}
*/
const matchPassword = async ({ body, user }) => {
    const isValid = await bcrypt.compare(body.password, user.WUserPassword)    
    if(!isValid) throw new HttpError(401, 'Invalid credentials')
    delete user.WUserPassword
    return { data: user }
}

module.exports = matchPassword