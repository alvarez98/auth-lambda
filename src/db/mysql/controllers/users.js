const { Op } = require("sequelize")
const { User } = require('../models')
const HttpError = require("../../../classes/httpError")

module.exports.findUser = async (body) => {
    try {
        const user = await User.findOne({
            where: {
                WUserEmail: { [Op.eq]: body.email },
                Inactive: { [Op.eq]: 0 },
                Cancelled: { [Op.eq]: 0 }
            },
            attributes: ['WUserID', 'WUserEmail', 'WUserFirstName', 'WUserLastName', 'WUserPassword']
        })
        if (user === null) throw new HttpError(401, 'Invalid credentials')
        return { body, user }
    } catch (error) {
        if (error instanceof HttpError) throw new HttpError(error.code, error.message)
        throw new Error(error)
    }
}

module.exports.updateUserInDB = async (data) => {
    try {
        const WUserID = data.pathParameters.id
        let user = await User.findOne({ where: { WUserID }})
        if (!user) throw new HttpError(404, 'User not found')
        await user.update(data.body)
        return { message: 'Updated' }
    } catch (error) {
        if (error instanceof HttpError) throw new HttpError(error.code, error.message)
        throw new Error(error)
    }
}

module.exports.addUserInDB = async (data) => {
    try {
        let user = await User.create(data.body)
        return { message: 'Created', id: user.WUserID }
    } catch (error) {
        if (error.name === 'SequelizeUniqueConstraintError') 
            throw new HttpError(400, error.errors[0].message)
        throw new Error(error)
    }
}