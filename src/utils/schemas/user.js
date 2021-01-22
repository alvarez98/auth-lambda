const Joi = require('@hapi/joi')

module.exports.user = Joi.object({
    WUserLastName: Joi.string(),
    WUserFirstName: Joi.string(),
    WUserFullName: Joi.string()
})