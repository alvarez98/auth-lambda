import * as AWS from 'aws-sdk'

const { SNS_REGION, TOPIC_ARN } = process.env
AWS.config.update({region: SNS_REGION })

/**
 * @function sendNotification
 * @description Send Notification to SNS topic
 * @return {Promise} Notification promise
 */
const sendNotification = () => {
    const params = {
        Message: 'Successfully Authentication',
        TopicArn: TOPIC_ARN
    }
    return new AWS.SNS({ apiVersion: '2010-03-31' }).publish(params).promise()
}

export default sendNotification