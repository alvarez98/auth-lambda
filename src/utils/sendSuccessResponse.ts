import Response from "../classes/response";

/**
 * @function sendSuccessResponse
 * @param Res 
 * @return {Function} param {Object} {token}
 */
const sendSuccessResponse = (Res:Response) => ({ token }) => Res.success({ access: token })

export default sendSuccessResponse