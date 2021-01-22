const Joi = require('@hapi/joi')

module.exports.password = Joi.object({
    WUserPassword: Joi.string().min(6).required()
})