/**
 * @function sendSuccessResponse
 * @param Res 
 * @return {Function} param {Object} {token}
 */
const sendSuccessResponse = (Res) => (body) => Res.success(body)

module.exports = sendSuccessResponse