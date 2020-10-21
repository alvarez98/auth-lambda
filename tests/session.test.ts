import { getTokenBySessionID } from "../src/handler"

const dummyData = [
    // {
    //     "uuid": "invalidUuid", // Invalid uuid: expect 400
    // },
    // {
    //     "uuid": "44ca2872-84db-46dd-9f3b-54b6ba796129" // Non-existent uuid: Expect 400
    // },
    {
        "uuid": "69621b0b-232e-4957-aa17-d070ee5a0b64", // Invalid password: Expect 200
    },
]

const dummyEvent = {
    headers:{
        "Authorization": "Bearer api_key"
    },
    pathParameters: {}
}

const test = () => {
    dummyData.forEach((data) => {
        dummyEvent.pathParameters = { uuid: data.uuid }       
        getTokenBySessionID(dummyEvent, {}).then(res => console.log(res))
    })
}

test()