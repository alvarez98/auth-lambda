import * as Joi from '@hapi/joi'

export const uuid = Joi.object({
    uuid: Joi.string().guid({ version: ['uuidv4'] }).required()
})

export const id = Joi.object({
    id: Joi.number().integer().required()
})