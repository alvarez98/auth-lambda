import * as Joi from '@hapi/joi'

export const auth = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
})