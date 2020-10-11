/**
 * @class Response
 * @classdesc Class for response assembly for serverless
 */
class Response {
    /**
     * @method formatter
     * @description Formats the response
     */
    formatter(statusCode:number, body:{}) {
        return {
            statusCode,
            body: JSON.stringify(body, null, 2)
        }
    }
    /**
     * @method success
     * @description Create a new success response
     */
    success(data:{}){
        return this.formatter(200, data)
    }
    /**
     * @method error
     * @description Create a new error response
     */
    error(code:number = 500, message:any = 'Internal server error'){
        return this.formatter(code, {"error": message})
    }
}

export default Response