const Joi = require('@hapi/joi')

module.exports.email = Joi.object({
    WUserEmail: Joi.string().email().required()
})