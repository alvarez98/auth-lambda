import * as Joi from '@hapi/joi'

export const user = Joi.object({
    WUserLastName: Joi.string(),
    WUserFirstName: Joi.string(),
    WUserFullName: Joi.string()
})