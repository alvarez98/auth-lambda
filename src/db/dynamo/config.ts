import * as AWS from 'aws-sdk'

const { DB_DY_HOST, DB_DY_REGION } = process.env
let docClient = new AWS.DynamoDB.DocumentClient( {
    endpoint: DB_DY_HOST,
    convertEmptyValues: true,
    region: DB_DY_REGION
});

export default docClient