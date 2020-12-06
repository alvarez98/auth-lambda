const { Op } = require("sequelize")
const { ApiKey } = require('../models')
const HttpError = require("../../../classes/httpError")
const moment = require("moment")

module.exports.validateApiKey = async (apikey) => {
    try {
        const result = await ApiKey.count({
            where: {
                APIKey: { [Op.eq]: apikey },
                APIExpiration: { [Op.gte]: moment() }
            }
        })
        return result
    } catch (error) {
        if (error instanceof HttpError) throw new HttpError(error.code, error.message)
        throw new Error(error)
    }
}