import { Op } from "sequelize";
import { Users } from './models/'
import HttpError from "../../classes/httpError";

const findUser = async (body) => {
    const user = await Users.findOne({
        where: {
            WUserEmail: { [Op.eq]: body.email },
            Inactive: { [Op.eq]: 0 },
            Cancelled: { [Op.eq]: 0 }
        },
        attributes: ['WUserID', 'WUserEmail', 'WUserFullName', 'WUserFirstName', 'WUserLastName', 'WUserPassword']
    }).catch(error => error)
    if (user instanceof Error) throw new HttpError()
    else if(user === null) throw new HttpError(401, 'Invalid credentials')
    return { body, user }
}

export default findUser