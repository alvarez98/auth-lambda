class Response {
    formatter(statusCode, body) {
        return {
            statusCode,
            body: JSON.stringify(body, null, 2)
        }
    }
    success(data){
        return this.formatter(200, data)
    }
    error(code = 500, message = 'Internal server error'){
        return this.formatter(code, {"error": message})
    }
}

module.exports = Response