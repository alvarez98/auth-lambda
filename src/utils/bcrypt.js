const bcrypt = require('bcrypt')

/**
 * @function encryptPassword
 * @description Funtion to encrypt password
 * @param {Object} data - data
 * @return {Object} data
 */
const encryptPassword = (data) => {
    data.body.WUserPassword = encrypt(data.body.WUserPassword) 
    return data
}

/**
 * @function encryptPassword
 * @description Funtion to encrypt text
 * @param {String} text - Text to encrypt
 * @param {Number} saltRounds - Bcrypt param
 * @return {String} encrypted text 
 */
const encrypt = (text) => {
    const salt = bcrypt.genSaltSync(parseInt(process.env.ROUNDS_BCRYPT))
    return bcrypt.hashSync(text, salt) 
}

module.exports = {
    encryptPassword,
    encrypt
}