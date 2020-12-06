const Joi = require('@hapi/joi') 

module.exports.updateUser = Joi.object({
    WUserLastName: Joi.string(),
    WUserFirstName: Joi.string(),
    WUserFullName: Joi.string()
})

module.exports.user = Joi.object({
    WUserEmail: Joi.string().email().required(),
    WUserPassword: Joi.string().required(),
    WUserLastName: Joi.string().required(),
    WUserFirstName: Joi.string().required(),
    WUserFullName: Joi.string().required(),
    Inactive: Joi.number().integer().required(),
    Cancelled : Joi.number().integer().required()
})