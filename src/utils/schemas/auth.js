const Joi = require('@hapi/joi') 

module.exports.auth = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
})