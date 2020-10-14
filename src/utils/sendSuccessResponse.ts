import Response from "../classes/response";

/**
 * @function sendSuccessResponse
 * @param Res 
 * @return {Function} param {Object} {token}
 */
const sendSuccessResponse = (Res:Response) => ({ token, session }) => Res.success({ session, access: token })

export default sendSuccessResponse