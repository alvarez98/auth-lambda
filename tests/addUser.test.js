const { addUser } = require("../src/handler") 

const dummyData = [
    {
        body: {
            WUserLastName: "Alvarez Pacheco",
            WUserFirstName: "Esteban",
            WUserFullName: "Esteban Alvarez Pacheco",
            WUserPassword: "123456",
            WUserEmail: "otro@gmail.com",
            Inactive:0,
            Cancelled:0
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
        addUser(dummyEvent, {}).then(res => console.log(res))
    })
}

test()