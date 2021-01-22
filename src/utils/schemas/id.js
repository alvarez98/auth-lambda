const Joi = require('@hapi/joi')

module.exports.uuid = Joi.object({
    uuid: Joi.string().guid({ version: ['uuidv4'] }).required()
})

module.exports.id = Joi.object({
    id: Joi.number().integer().required()
})