import Response from "../classes/response";

/**
 * @function sendSuccessResponse
 * @param Res 
 * @return {Function} param {Object} {token}
 */
const sendSuccessResponse = (Res:Response) => (body) => Res.success(body)

export default sendSuccessResponse