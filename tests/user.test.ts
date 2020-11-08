import { updateUser } from "../src/handler"

const dummyData = [
    {
        id: "1", // Valid data: Expect 200
        body: {
            WUserLastName: "Alvarez",
            WUserFirstName: "Adolfo",
            WUserFullName: "Adolfo Alvarez"
        }
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
        dummyEvent.body = JSON.stringify(data.body)   
        updateUser(dummyEvent, {}).then(res => console.log(res))
    })
}

test()