const { updateEmail } = require("../src/handler")

const dummyData = [
    // {
    //     "id": "invalidUuid", // Invalid id: expect 400
    //     "WUserPassword": ""
    // },
    // {
    //     "id": "2", // Non-existent id: Expect 400
    //     "WUserPassword": "newpassword"
    // },
    {
        "id": "1", // Valid data: Expect 200
        "WUserEmail": "aeap@gmail.com"
    }
]

const dummyEvent = {
    headers: {
        "Authorization": "Bearer a7sf7g33vv7v3"
    },
    pathParameters: {},
    body: ""
}

const test = () => {
    dummyData.forEach((data) => {
        dummyEvent.pathParameters = { id: data.id }    
        dummyEvent.body = JSON.stringify({ "WUserEmail": data.WUserEmail})   
        updateEmail(dummyEvent, {}).then(res => console.log(res))
    })
}

test()