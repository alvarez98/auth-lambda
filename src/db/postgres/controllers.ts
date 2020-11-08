import { Op } from "sequelize";
import { Users, ApiKeys } from './models/'
import HttpError from "../../classes/httpError";
import * as moment from "moment";

export const findUser = async (body) => {
    const user = await Users.findOne({
        where: {
            WUserEmail: { [Op.eq]: body.email },
            Inactive: { [Op.eq]: 0 },
            Cancelled: { [Op.eq]: 0 }
        },
        attributes: ['WUserID', 'WUserEmail', 'WUserFirstName', 'WUserLastName', 'WUserPassword']
    }).catch(error => error)
    if (user instanceof Error) throw new HttpError()
    else if(user === null) throw new HttpError(401, 'Invalid credentials')
    return { body, user }
}

export const updateInDB = async (data) => {
    const user = await Users.update(data.body, { 
        where: {
            WUserID: data.pathParameters.id
        }
    }).catch(error => error)
    if (user instanceof Error) throw new HttpError()
    if(user[0]===0) throw new HttpError(404, 'User not found')
    return { message: 'Updated' }
}

export const validateApiKey = async (apikey) => {
    const result = await ApiKeys.count({
        where: {
            APIKey: { [Op.eq]: apikey },
            APIExpiration: { [Op.lt]: moment() }
        }
    }).catch(error => error)
    if (result instanceof Error) throw new HttpError()
    return result
}