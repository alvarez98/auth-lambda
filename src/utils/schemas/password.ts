import * as Joi from '@hapi/joi'

export const password = Joi.object({
    WUserPassword: Joi.string().min(6).required()
})