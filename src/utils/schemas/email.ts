import * as Joi from '@hapi/joi'

export const email = Joi.object({
    WUserEmail: Joi.string().email().required()
})